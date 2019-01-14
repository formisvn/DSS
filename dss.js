
var map;
var mapMoves = [];
var drawnItems;
var drawControl;
var forestLayerActive = null;
var referenceLayers = [];
var layersControl;
var randomScalingFactor = function(v) {
	return Math.round(v / 10000);
};
function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}
function populateSelect(select,array,value,name){
//Crating list of elements in select object
	var option,
		i = 0,
		il = array.length;
	for (; i < il; i += 1) {
		option = document.createElement('option');
		if(value === null){ //if value is set to null, use numbers 0
			option.setAttribute('value', i);
		} else {
			option.setAttribute('value', array[i][value]);
		}
		option.appendChild(document.createTextNode(array[i][name]));
		select.appendChild(option);
	}
}

$(window).on('load', function() {
	
	//Load data
	
	$.ajax({url:'http://maps.vnforest.gov.vn:802/geoserver/FRMS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=dss_provinces&outputFormat=application%2Fjson', //Load proinces
		success: function(data){
			var arr =[];
			$.each(data.features, function(){
				arr.push(this.properties);
			})
			var select_provinces = document.getElementsByClassName('province-data');
			$.each(select_provinces, function(){
				populateSelect(this,arr,'id', 'name');
			})
		}
	});
	
	
	//Map
	map = new L.Map('map',{zoomControl: false, minZoom:5, center: [16.4, 106.8], zoom: 6});
	
	L.control.zoom({ position: 'topright' }).addTo(map);
	
	L.control.scale().addTo(map);
	drawnItems = new L.FeatureGroup(); // Prepare elements for drawning
	drawControl = new L.Control.Draw({ 
		position: 'topright',
		draw: {
			polyline: false,
			polygon: {
				allowIntersection: false,
				shapeOptions: {
					color: '#111',
					fillColor: '#ffce1a',
					weight: 3
				}
			},
			circle: {
				shapeOptions: {
					color: '#111',
					fillColor: '#ffce1a',
					weight: 3
				}
			},
			marker: false
		}
	});
	map.addLayer(drawnItems);
	map.addControl(drawControl);
	
	
	// Map undo/redo
	
	$($('.leaflet-top.leaflet-right')[0]).prepend($('#map-move-undo'));
	$($('.leaflet-top.leaflet-right')[0]).prepend($('#map-move-redo'));
	$('#map-move-undo').on('click', function(){
		map.setView(mapMoves[0],mapMoves[1]);
		$(this).hide();
		$('#map-move-redo').show();
	})
	$('#map-move-redo').on('click', function(){
		map.setView(mapMoves[0],mapMoves[1]);
		$(this).hide();
		$('#map-move-undo').show();
	})
	map.on('movestart', function(){
		if(!mapMoves.length){
			$('#map-move-undo').show();
		}
		mapMoves = [map.getCenter(),map.getZoom()];
	})
	
	$('#select-widget').append(drawControl._container);
	$(drawControl._container).hide();
	
	
	//Base layer

	var baseHillShade = L.tileLayer.wms("http://maps.vnforest.gov.vn:802/geoserver/gwc/service/wms", {
		layers: 'DEM:Hillshade_SRTM30',
		format: 'image/png',
		transparent: true,
		version: '1.1.0',
		attribution: ""
	});
	
	var reliefRGB = L.tileLayer.wms("http://34.251.61.8:8080/geoserver/gwc/service/wms", {
		layers: 'nfis:SRTM_VN_relief',
		format: 'image/png',
		transparent: true,
		version: '1.1.0',
		attribution: ""
	});
	
	var baseEsriImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
		minZoom:0,
		maxZoom: 18
	});
	
	var baseVietnam = L.tileLayer.wms("http://46.137.159.194/geoserver/gwc/service/wms", {
		layers: 'venues:vn_base_m',
		format: 'image/png',
		transparent: true,
		version: '1.1.1',
		attribution: "",
		maxZoom: 10
	});
	
	var baseEsriStreet = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
		minZoom:11,
		maxZoom: 13
	});
	
	var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		minZoom: 14,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});
	
	var topo = new L.layerGroup([OpenStreetMap_Mapnik, baseEsriStreet, baseVietnam]).addTo(map);
	
	var hansen = L.tileLayer.wms("http://maps.vnforest.gov.vn:802/geoserver/dss/wms", {
		layers: 'dss:VN_Hansen_Treecov_Clip_ext',
		format: 'image/png',
		transparent: true,
		version: '1.1.1',
		attribution: "",
		maxZoom: 10
	});
	
	var baseLayerEmpty = L.tileLayer('');
	
	

	layersControl = L.control.layers({}, {}).addTo(map);
	$('#tabs-details-1').append($(layersControl._container).children('.leaflet-control-layers-list')); //Move leaflet control to div 
	$("#tabs-details-1>form").children().each(function(i,li){$("#tabs-details-1>form").prepend(li)});
	var divlayersControl = layersControl.getContainer();
	divlayersControl.parentNode.removeChild(divlayersControl); //Delete control button
	
	layersControl.addBaseLayer(topo, dictionary["Topographic map"][lang]);
	layersControl.addBaseLayer(baseEsriImagery, dictionary["Satellite image"][lang]);
	layersControl.addBaseLayer(baseHillShade, dictionary["Hillshading"][lang]);
	layersControl.addBaseLayer(reliefRGB, dictionary["Relief"][lang]);
	layersControl.addBaseLayer(hansen, dictionary["Tree cover by Hansen"][lang]);
	layersControl.addBaseLayer(baseLayerEmpty, dictionary["No background map"][lang]);
	
	
	//Thematic and reference layers
	
	function getLegendUrl(lr) {
		if(typeof(lr.legend) == 'undefined' || typeof(lr.legend[lang]) == 'undefined' || !lr.legend[lang]){
			var legendUrl = lr.url.replace('gwc/service/','')+'?SERVICE=WMS&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&layer='+lr.layers+'&SCALE= 10000&legend_options=fontSize:11;bgColor:0xF5F5EF;';	// default url
		} else {
			var legendUrl = lr.legend[lang]+'&legend_options=fontSize:11;bgColor:0xF5F5EF;'
		}
		return legendUrl;
	}
	function addMenuForestLayer(lrs, j){
		$.each(lrs, function(i){
			var lr = {
				wms: new L.tileLayer.wms(this.url, {
					layers: this.layers,
					format: 'image/png',
					transparent: true,
					version: (typeof(this.version)=='undefined')?'1.1.0':this.version,
					crs: (typeof(this.crs)=='undefined')?null:this.crs,
					attribution: this.name,
					minZoom: this.minZoom
				}),
				dataset: j,
				legend: getLegendUrl(this),
				info: this.info,
				minZoom: this.minZoom
			}
			var $li = $("<li class='forest-lr'>"+this.name+"</li>");
			$li.appendTo('#forest-layers-part-'+j);
			this.li = $li;
			this.wms = lr;
			this.li.on('click', function(){
				if(!$(this).hasClass('display')){
					$('.forest-lr').removeClass('display');
					$(this).addClass('display')
					$('.forest-title h3').text($(this).text());
					$('#map').attr('title',$(this).text());
					$( "#dialog-details" ).dialog('open');
					$('#dialog-forest-layers').dialog('close');
					$($("#tabs-details").children('ul').children('li')[1]).show();
					$( "#tabs-details" ).tabs( "option", "active", 1);
				} else {
					$(this).removeClass('display');
					$('#layer-details').hide();
					$('.forest-title h3').text('');
					$('#map').attr('title','');
				}
				if(map.hasLayer(lr.wms) || forestLayerActive == lr){
					$( "#tabs-details" ).tabs( "option", "active", 0);
					$($("#tabs-details").children('ul').children('li')[1]).hide();
					map.removeLayer(lr.wms);
					layersControl.removeLayer(lr.wms);
				} else {
					if(forestLayerActive){
						map.removeLayer(forestLayerActive.wms);
						layersControl.removeLayer(forestLayerActive.wms);
						forestLayerActive = null;
					}
					$('#legend').attr('src',lr.legend);
					map.addLayer(lr.wms);
					layersControl.addOverlay(lr.wms, "<span class='forest-layer-active'>"+$(this).text()+"</span>");
					forestLayerActive = lr;
					forestLayerActive.wms.setZIndex($(layersControl._baseLayersList).children().length); //Put the layer above base layers and under reference layers
					forestLayerActive.wms.setOpacity($("#slider").slider('value')/100);
					if(forestLayerActive.minZoom && typeof(forestLayerActive.minZoom)!='undefined' && map.getZoom()<forestLayerActive.minZoom){
						$('#leaflet-layer-no-data').show();
					} else {
						$('#leaflet-layer-no-data').hide();
					}
				}
				getFeatureInfoButtonEnable();
			})
		})
	}
	
	$.each(forestLayersList, function(j){ //create menu based on array forestLayersList
		$("#forest-layers").append('<h3>'+this.name+'</h3>');
		var d = document.createElement('div');
		$(d).html("<ul id='forest-layers-part-"+j+"'></ul>").appendTo($("#forest-layers"));
		if(typeof(this.categories)!='undefined'){
			$('#forest-layers-part-'+j).addClass('ul-2-lvl');
			$.each(this.categories, function(k){	
				$('#forest-layers-part-'+j).append("<li><h3>"+this.name+"</h3><ul id='forest-layers-part-"+j+"-"+k+"'></ul></li>");
				addMenuForestLayer(this.layers, j+'-'+k);
			})
		} else {
			addMenuForestLayer(this.layers, j);
		}
		
	})
	
	function addMenuAdmLayer(lrs, j){
		$.each(lrs, function(i,e){
			var lr = L.tileLayer.wms(this.url, {
				layers: this.layers,
				format: 'image/png',
				transparent: true,
				version: (typeof(this.version)=='undefined')?'1.1.0':this.version,
				crs: (typeof(this.crs)=='undefined')?null:this.crs,
				attribution: this.name
			});
			var name = this.name;
			this.wms = lr;
			var $li = $("<li class='checkable'>"+this.name+"</li>");
			$li.appendTo('#base-layers-part-'+j);
			this.li = $li;
			this.active = false;
			referenceLayers.push(this);
			this.li.on('click', function(){
				if($(this).hasClass('checked')){
					$(this).removeClass('checked');
					layersControl.removeLayer(lr);	
					map.removeLayer(lr);
					e.active = false;
				} else {
					$(this).addClass('checked');
					layersControl.addOverlay(lr, name);
					map.addLayer(lr);
					e.active = true;
				}
				getFeatureInfoButtonEnable();
			})
			if(!location.hash.length && (this.layers == 'adm_boundaries' || this.layers == 'forest_mng_boundaries')){
				this.li.click();
			}
		})
	}
	
	$.each(referenceLayersList, function(j){ //create menu based on array referenceLayersList
		$("#reference-layers").append('<li>'+this.name+'<ul id="base-layers-part-'+j+'"></ul></li>');
		addMenuAdmLayer(this.layers, j);
	})
	
	map.on("zoomend layerremove layeradd", function(){
		if(forestLayerActive && map.hasLayer(forestLayerActive.wms) && forestLayerActive.minZoom && typeof(forestLayerActive.minZoom)!='undefined' && map.getZoom()<forestLayerActive.minZoom){
			$('#leaflet-layer-no-data').show();
		} else {
			$('#leaflet-layer-no-data').hide();
		}
		getFeatureInfoButtonEnable();
	});
	
	map.on("layeradd", function(e){
		getFeatureInfoButtonEnable();
		if(forestLayerActive){
			if(typeof(e.layer.options) == "undefined" && map.hasLayer(baseLayerEmpty)){
				$("#slider").slider('value',100);
				forestLayerActive.wms.setOpacity(1);
			} else if (typeof(e.layer.options) != "undefined" && e.layer.options.layers == "DEM:Hillshade_SRTM30" && map.hasLayer(baseHillShade)) {
				$("#slider").slider('value',70);
				forestLayerActive.wms.setOpacity(7/10);
			}
		}
	});
	
	
	//Search dialog
	
	var selectedFeature = new L.geoJson([],{
		style: function(feature) {
			return {
				color: '#3a7118',
				fillColor: '#327E04',
				fillOpacity: 0.1
			};
		},
		onEachFeature: function(feature, layer) {
			layer.bindPopup(dictionary['Click on the object to delete'][lang]);
			layer.on('mouseover', function(e) {
				this.openPopup();
			});
			layer.on('mouseout', function(e) {
				map.closePopup();
			});
			layer.on('click',function(){
				selectedFeature.clearLayers();
			});
		}
	});
	
	function selectAdmFeature() {
		var province = $('#search-province').val();
		var district = $('#search-district').val();
		var commune = $('#search-commune').val();
		var compt = $('#search-compartment').val();
		var subcompt = $('#search-subcompartment').val();
		var plot = $('#search-plot').val();
		var q1 = "commune_code="+commune;
		var q2 = " AND compt_code='"+compt+"'";
		var q3 = " AND sub_compt_code='"+subcompt+"'";
		var q4 = " AND plot_code= '"+plot+"'";
		if(plot!='0') {
			var filter = q1+q2+q3+q4;
			var type = 'plot';
		} else if(subcompt!='0') {
			var filter = q1+q2+q3;
			var type = 'sub_compartment';
		}  else if(compt!='0') {
			var filter = q1+q2;
			var type = 'compartment';
		} else if(commune!='0') {
			var filter = q1;
			var type = 'commune';
		} else if(district!='0') {
			var filter = 'district_code='+district;
			var type = 'district';
		} else if(province!='0') {
			var filter = 'province_code='+province;
			var type = 'province';
		}
		var url = 'http://maps.vnforest.gov.vn:802/geoserver/wfs';
		$.ajax({url:url,
			type: 'GET', 
			async: false,
			crossDomain: true, 
			data:{
				service:"WFS", 
				version:'1.0.0',
				request:'GetFeature',
				typeName:'nfis:'+type,
				outputFormat:'json',
				srsName:'EPSG:4326',
				CQL_FILTER:filter
			},
			dataType: 'json',
			contentType: 'application/json',
			success: function(data){
				selectedFeature.clearLayers();
				selectedFeature.addData(data);
				map.fitBounds(selectedFeature.getBounds());
				selectedFeature.addTo(map);
				$('#dialog-search').dialog('close');
				$('#nav input').removeAttr('checked');
				$( "#nav" ).buttonset('refresh');
				setTimeout(function(){ 
					selectedFeature.clearLayers();
				}, 3000);
			}
		});
	}
	
	$("#search-btn").on('click', function(){
		selectAdmFeature();
	})
	
	$('#search-province').on('change', function(){
		document.getElementById("search-district").options.length=1;
		document.getElementById("search-commune").options.length=1;
		document.getElementById("search-compartment").options.length=1;
		document.getElementById("search-subcompartment").options.length=1;
		document.getElementById("search-plot").options.length=1;
		$('.search-lvl-province').hide();
		$('#search-lvl-loader').show();
		if($(this).val()!='0'){
			$.ajax({url:'http://maps.vnforest.gov.vn:802/geoserver/FRMS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=dss_districts&outputFormat=application%2Fjson&viewparams=province_code:'+$(this).val(),
				success: function(data){
					$('#search-lvl-loader').hide();
					$('#search-lvl-district').show();
					$('.province-data').val($('#search-province').val());
					var select_districts = document.getElementsByClassName('district-data');
					var arr=[];
					$.each(data.features, function(){
						arr.push(this.properties);
					})
					$.each(select_districts, function(i){
						this.options.length=1;
						populateSelect(this,arr,'id','name');
					})
					$('.commune-data').html($('#search-commune').html());
					$('.commune-data').val($('#search-commune').val());
					return true;
				}
			});
		}
	})
	
	$('#search-district').on('change', function(){
		document.getElementById("search-commune").options.length=1;
		document.getElementById("search-compartment").options.length=1;
		document.getElementById("search-subcompartment").options.length=1;
		document.getElementById("search-plot").options.length=1;
		$('.search-lvl-district').hide();
		$('#search-lvl-loader').show();
		if($(this).val()!='0'){
			$.ajax({url:'http://maps.vnforest.gov.vn:802/geoserver/FRMS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=dss_communes&outputFormat=application%2Fjson&viewparams=district_code:'+$(this).val(),
				success: function(data){
					$('#search-lvl-loader').hide();
					$('#search-lvl-commune').show();
					$('.province-data').val($('#search-province').val());
					var d_val = $('#search-district').val();				
					$('.district-data').html($('#search-district').html());
					$('.district-data').val(d_val);
					var select_communes = document.getElementsByClassName('commune-data');
					var arr=[];
					$.each(data.features, function(){
						arr.push(this.properties);
					})
					$.each(select_communes, function(){
						this.length=1;
						populateSelect(this,arr,'id','name');
					})
				}
			});
		}
	})
	
	$('#search-commune').on('change', function(){
		document.getElementById("search-compartment").options.length=1;
		document.getElementById("search-subcompartment").options.length=1;
		document.getElementById("search-plot").options.length=1;
		$('.search-lvl-commune').hide();
		$('#search-lvl-loader').show();
		if($(this).val()!='0'){
			$.ajax({url:'http://maps.vnforest.gov.vn:802/geoserver/FRMS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=dss_compartments&outputFormat=application%2Fjson&viewparams=commune_code:'+$(this).val(),
				success: function(data){
					var arr=[];
					$.each(data.features, function(){
						arr.push(this.properties);
					})
					$('#search-lvl-loader').hide();
					$('#search-lvl-compartment').show();
					$('.province-data').val($('#search-province').val());
					var d_val = $('#search-district').val();
					$('.district-data').html($('#search-district').html());
					$('.district-data').val(d_val);
					var c_val = $('#search-commune').val();
					$('.commune-data').html($('#search-commune').html());
					$('.commune-data').val(c_val);
					var s = document.getElementById('search-compartment');
					populateSelect(s,arr,'id','name');
				}
			});
		}
	})
	
	$('#search-compartment').on('change', function(){
		document.getElementById("search-subcompartment").options.length=1;
		document.getElementById("search-plot").options.length=1;
		$('.search-lvl-compartment').hide();
		$('#search-lvl-loader').show();
		if($(this).val()!='0'){
			$.ajax({url:'http://maps.vnforest.gov.vn:802/geoserver/FRMS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=dss_sub_compartments&outputFormat=application%2Fjson&viewparams=commmune_code:'+$('#search-commune').val()+';compt_code:'+$(this).val(),
				success: function(data){
					var arr=[];
					$.each(data.features, function(){
						arr.push(this.properties);
					})
					$('#search-lvl-loader').hide();
					$('#search-lvl-subcompartment').show();
					var s = document.getElementById('search-subcompartment');
					populateSelect(s,arr,'id','name');
				}
			});
		}
	})
	
	$('#search-subcompartment').on('change', function(){
		document.getElementById("search-plot").options.length=1;
		$('.search-lvl-subcompartment').hide();
		$('#search-lvl-loader').show();
		if($(this).val()!='0'){
			$.ajax({url:'http://maps.vnforest.gov.vn:802/geoserver/FRMS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=dss_plots&outputFormat=application%2Fjson&viewparams=commune_code:'+$('#search-commune').val()+';compt_code:'+$('#search-compartment').val()+';sub_compt_code:'+$(this).val(),
				success: function(data){
					var arr=[];
					$.each(data.features, function(){
						arr.push(this.properties);
					})
					$('#search-lvl-loader').hide();
					$('#search-lvl-plot').show();
					var s = document.getElementById('search-plot');
					populateSelect(s,arr,'id','name');
				}
			});
		}
	})
	
	
	//Statistics
	
	populateSelect(document.getElementById('quick-stat-data-set'), quickStatisticsList ,null ,'name');
	
	$('#quick-stat-data-set').on('change', function(){
		var val = $(this).val();
		document.getElementById("quick-stat-type").options.length=0;
		populateSelect(document.getElementById('quick-stat-type'), quickStatisticsList[val].types ,'layer' ,'name');
	}).change();
	
	function quickStatValidation(){
		var validation = 0;
		$.each($('#tabs-report-0').find('p .tab-select'), function(){ // Highlight obligatory fields if not filled
			if( $(this).is(':visible') && $(this).val()=='0'){
				this.style.borderColor='red';
				validation++;
			} else {
				this.style.borderColor='#a9a9a9';
			}
		})
		if($('#quick-stat-select').is(':visible') && !drawnItems.getLayers().length){
			$('#quick-stat-select button').css('background','#f84848');
			validation++;
		}
		return validation?false:true;
	}
	
	function quickStatSend(){
		$('#quick-stat-error').hide();
		$('#dialog-quick-statistics').dialog('close');
		$('#view-quick-report').hide();
		$("#quick-report-loader").show();
		var pGeom = '', pLat = '', pLng = '', pRadius = '', pProvince = '', pDistrict = '', pCommune = '';
		var attribute = $('#quick-stat-type').val();
		var owsrootUrl = "http://maps.vnforest.gov.vn:802/geoserver/wfs?version=1.0.0&request=GetFeature&typeName="+attribute+"&outputFormat=application/json";
		if($('#quick-stat-source').val()=='un'){
			$('#quick-stat-select-adm-uni').val()=='pr'?pProvince = "province:"+$('#quick-stat-province').val()+';':pProvince='';
			$('#quick-stat-select-adm-uni').val()=='di'?pDistrict = "district:"+$('#quick-stat-district').val()+';':pDistrict='';
			$('#quick-stat-select-adm-uni').val()=='co'?pCommune = "commune:"+$('#quick-stat-commune').val()+';':pCommune='';
		} else if(drawnItems.getLayers().length){
			var geom = drawnItems.getLayers()[0];
			if(geom instanceof L.Circle){
				var coords = geom.getLatLng()
				pLat = 'lat:' + coords.lat + ';';
				pLng = 'lng:' + coords.lng + ';';
				pRadius = 'radius:' + geom.getRadius() + ';';
			} else {
				var wkt = new Wkt.Wkt(); 
				wkt.fromObject(geom);
				var pGeom = 'geom:'+wkt.toLocaleString().replace(/,/g,'\\,')+';';
			}
		}
		pLang = 'lang:'+lang+';';
		
		var defaultParameters2 = {
			viewparams: (pGeom + pLat + pLng + pRadius + pProvince + pDistrict + pCommune + pLang).slice(0, -1)
		};
		var parameters = L.Util.extend(defaultParameters2); 
		var param = L.Util.getParamString(parameters); 
		param = param.substring(1);
		param = '&' + param; 
		var URL = owsrootUrl + param;
		var ajax = $.ajax({
			url : URL,
			dataType : 'json', 
			success : function (response) {
				$("#quick-report-loader").hide();
				$('#view-quick-report').show();
				$('#dialog-quick-statistics').dialog('option', 'title', dictionary["Quick statistics"][lang] + ': ' + $("#quick-stat-type option:selected").text());
				$('#canvas-holder').html('<canvas id="chart" />');
				$('#dialog-quick-statistics').dialog('open');
				var dataPoints = [];
				var dataColors = [];
				var dataLabels = [];
				var dataArea = 0, dataPlots = 0, dataTimber = 0;
				var table = $('#dialog-quick-statistics-table');
				table.html('')
				table.append( '<tr><th> </th><th>' + dictionary['Name'][lang] + '</th><th>'+dictionary['Area'][lang]+' [ha]</th><th>'+dictionary['Number of plots'][lang]+'</th><th>' + dictionary['Total volume'][lang] + ' [m3]</th><th>' + dictionary['Volume'][lang] + ' [m3/ha]</th></tr>' );
				$.each(response.features, function(){
					var piece = this.properties.area_ha;
					dataPoints.push(piece);
					dataColors.push(this.properties.color?'#'+this.properties.color:getRandomColor());	
					var label = this.properties.label?this.properties.label:dictionary["No value"][lang];
					dataLabels.push(label);	
					dataArea = dataArea + piece;
					dataPlots = dataPlots + this.properties.count;
					dataTimber = dataTimber + this.properties.volume;
				})
				$.each(response.features, function(i){
					var value = this.properties.value?this.properties.value:dictionary["No value"][lang];
					table.append( '<tr><td><span style="background-color:'+dataColors[i]+'"></span></td><td>' + value + '</td><td>' + Math.round(dataPoints[i]) + '</td><td>' + this.properties.count + '</td><td>' + Math.round(this.properties.volume) + '</td><td>' + Math.round(this.properties.volume/dataPoints[i]) + '</td></tr>' );
				})	
				
				$('#dialog-quick-statistics-summary-area span').text(Math.round(dataArea).toLocaleString() + ' ha');
				$('#dialog-quick-statistics-summary-plots span').text(dataPlots.toLocaleString());
				$('#dialog-quick-statistics-summary-timber span').text(Math.round(dataTimber).toLocaleString()+' m3');
				
				var config = {
					type: 'pie',
					data: {
						labels: dataLabels,
						datasets: [{
							data: dataPoints,
							backgroundColor: dataColors,
							label: $('#quick-stat-type option:selected').text()
						}]
					},
					options: {
						responsive: true,
						legend: {
							display: false
						},
						tooltips: {
							mode: 'label',
							callbacks: {
								label: function(tooltipItem, data) { 
									var indice = tooltipItem.index;				 
									return  data.labels[indice] + ' - ' + Math.round(data.datasets[0].data[indice]/dataArea*100) + '%';
								}
							}
						}
					}
				};

				var ctx = document.getElementById("chart").getContext("2d");
				window.myPie = new Chart(ctx, config);
			}, error: function(e){
				console.log(e);
				$("#quick-report-loader").hide();
				$('#view-quick-report').show();
				$('#quick-stat-error').show();
			}
		});
	}
	
	$('#view-quick-report').on('click', function(){
		if(quickStatValidation()){
			quickStatSend();
		}
	})
	
	function getMapCenterAdmUnit(){
		$('#quick-stat-region-loader').show();
		var owsrootUrl = "http://maps.vnforest.gov.vn:802/geoserver/wfs?version=1.0.0&request=GetFeature&typeName=FRMS:dss_adm_level&outputFormat=application/json";
		var pLat = 'lat:' + map.getCenter().lat + ';';
		var pLng = 'lng:' + map.getCenter().lng + ';';
		var defaultParameters2 = {
			viewparams: (pLat + pLng).slice(0, -1)
		};
		var parameters = L.Util.extend(defaultParameters2); 
		var param = L.Util.getParamString(parameters); 
		param = param.substring(1);
		param = '&' + param; 
		var URL = owsrootUrl + param;
		var ajax = $.ajax({
			url : URL,
			dataType : 'json', 
			success : function (response) {
				var z = map.getZoom();
				if(z<9){
					$('.select-adm-uni').val('vn');
				} else if(z<11){
					$('.select-adm-uni').val('pr');							
				} else if(z<14){
					$('.select-adm-uni').val('di');		
				} else {
					$('.select-adm-uni').val('co');
				}
				$('.select-adm-uni').change();
				if(response.features.length){
					var p =response.features[0].properties.code;
					var d =response.features[1].properties.code;
					var c =response.features[2].properties.code;
					$('#quick-stat-province').val(p);
					updateQsProvince(d,c);
				}
			}, error: function(e){
				console.log(e);
			}
		});
	}
	
	$('#quick-stat-source').change(function() {
		$('#view-quick-report').show();
		if ($(this).val() == 'pl') {
			$('#quick-stat-adm-uni').hide();
			$('.quick-stat-region').hide();
			$('#quick-stat-select').show();
			if(drawnItems.getLayers().length){
				map.fitBounds(drawnItems.getLayers()[0]);
			}
		} else if ($(this).val() == 'un') {
			$("#quick-stat-adm-uni").show();
			$('#quick-stat-select').hide();
			getMapCenterAdmUnit();
		} else {
			$('#quick-stat-adm-uni').hide();
			$('.quick-stat-region').hide();
			$('#quick-stat-select').hide();
		}
	});
	
	$('.quick-stat-date').on('change', function(){
		if($('#quick-stat-date1').val() > $('#quick-stat-date2').val()){
			$('#quick-stat-date2').val($('#quick-stat-date1').val());
		}
	})
	
	$('#quick-stat-select-adm-uni').on('change', function(){
		if ($(this).val() == 'vn' || $(this).val() == '0') {
			$('.quick-stat-region').hide();
		} else if ($(this).val() == 'pr') {
			$('.quick-stat-region').hide();
			 $('#quick-stat-region-province').show();
		} else if ($(this).val() == 'di') {
			$('.quick-stat-region').hide();
			$('#quick-stat-region-province').show();
			$('#quick-stat-region-district').show();
		} else if ($(this).val() == 'co') {
			$('.quick-stat-region').show();
		}
	})
	
	function updateQsProvince(district,commune){
		if(district == 'undefined'){
			commune = 0;
			district = 0;
		}
		document.getElementById('quick-stat-district').options.length = 1;
		document.getElementById('quick-stat-commune').options.length = 1;
		$('#quick-stat-region-loader').show();
		if($('#quick-stat-province').val()!=0){
			$.ajax({url:'http://maps.vnforest.gov.vn:802/geoserver/FRMS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=dss_districts&outputFormat=application%2Fjson&viewparams=province_code:'+$('#quick-stat-province').val(),
				district:district,
				commune:commune,
				success: function(data){
					var arr=[];
					$.each(data.features, function(){
						arr.push(this.properties);
					})
					var s = document.getElementById('quick-stat-district');
					populateSelect(s,arr,'id','name');
					if(this.district){
						$(s).val(this.district);
						updateQsDistrict(this.commune);
					} else {
						$('#quick-stat-region-loader').hide();
					}
				}
			});
		}
	}
	
	$('#quick-stat-province').on('change', function(){
		updateQsProvince();
	})
	
	$('#quick-stat-district').on('change', function(){
		updateQsDistrict();
	})
	
	function updateQsDistrict(commune){
		if(commune == 'undefined'){
			commune = 0;
		}
		document.getElementById('quick-stat-commune').options.length = 1;
		$('#quick-stat-region-loader').show();
		if($('#quick-stat-district').val()!=0){
			$.ajax({url:'http://maps.vnforest.gov.vn:802/geoserver/FRMS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=dss_communes&outputFormat=application%2Fjson&viewparams=district_code:'+$('#quick-stat-district').val(),
				commune:commune,
				success: function(data){
					var arr=[];
					$.each(data.features, function(){
						arr.push(this.properties);
					})
					var s = document.getElementById('quick-stat-commune');
					populateSelect(s,arr,'id','name');
					if(this.commune){
						$(s).val(this.commune);
					}
					$('#quick-stat-region-loader').hide();
				}
			});
		}
	}
	
	
	//Get info
	
	function getFeatureInfoButtonEnable(){
		var count = 0;
		for (var i = 0, ii = referenceLayers.length; i < ii; ++i) {
			var layer = referenceLayers[i];
			if (layer.active && referenceLayers[i].info != -1 && map.hasLayer(layer.wms)) {
				count++;
			}
		}
		if(forestLayerActive && map.hasLayer(forestLayerActive.wms)){
			if(forestLayerActive.minZoom && typeof(forestLayerActive.minZoom)!='undefined' && map.getZoom()>=forestLayerActive.minZoom) {
				count++;
			} else if(!forestLayerActive.minZoom || typeof(forestLayerActive.minZoom)=='undefined') {
				count++;
			}
		}
		if(count){
			$('#info-btn').removeClass('disabled');
		} else {
			$('#info-btn').addClass('disabled');
		}
	}
	
	function getLayerInfo(url,e){
		var bboxArr = map.getBounds();
		var bboxSW = bboxArr.getSouthWest();
		var bboxNE = bboxArr.getNorthEast();
		var bbox = bboxArr.toBBoxString();
		var point = e.containerPoint;
		var size = map.getSize();
		var url = url + '&FEATURE_COUNT=1&x='+Math.round(point.x)+'&y='+Math.round(point.y)+'&WIDTH='+size.x+'&HEIGHT='+size.y+'&CRS=EPSG:4326&BBOX='+bbox;
		$('#info-container').append("<img src='images/load2.gif'>");
		$.ajax({
			url: url,
			dataType: 'html',
			type: "GET",
			success: function(response) {
				$($('#info-container').find('img')[0]).remove();
				var table  = $(response).find('table').andSelf().filter('table');
				if (table.length) { 
					$('#info-no-data').hide();
					$.each(table.find('tr>td:first-child'), function(){
						if(dictionary_attr[$(this).text()]){ 
							$(this).text(dictionary_attr[$(this).text()][lang]) 
						}
					})
					var doubleInfo = false;
					$.each($('#info-container').children('table'), function(){
						console.log(this);
						if(table[0].textContent==this.textContent){
							doubleInfo = true;
						}
					})
					if(!doubleInfo){
						$('#info-container').append(table);
					}
					$.each($('#info-container').find('h2'), function(){
						var title = dictionary[$(this).text()]; 
						if(typeof(title)!='undefined'){
							$(this).text(title[lang]);
						}
					})
				} else {
					if(!$('#info-container').find('table').length){
						$('#info-no-data').show();
					}
				}
			}, 
			error: function(){
				if(!$('#info-container').find('table').length){
					$('#info-no-data').show();
				}
			}
		});
	}
	
	function defaultGetFeatureInfoUrl(lr){
		var source = lr.wms._url;
		var name = lr.wms.options.layers;
		var url = ''+source.replace('gwc/service/','')+'?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS='+name+'&LAYERS='+name+'&INFO_FORMAT=text/html';
		return url;
	}
	
	function showFeatureInfo(e) {
		$($( "#tabs-details" ).children('ul').children('li')[2]).show();
		$('#info-no-data').hide();
		$('#info-container').text('');
		$( "#tabs-details" ).tabs( "option", "active", 2);
		var zoom = map.getZoom();
		var count = 0;
		for (var i = 0, ii = referenceLayers.length; i < ii; ++i) {
			var layer = referenceLayers[i];
			if (layer.active && layer.wms.options.minZoom <= zoom && layer.wms.options.maxZoom >= zoom && referenceLayers[i].info != -1) {
				var infoUrl = referenceLayers[i].info[lang];
				if(typeof(infoUrl) == 'undefined' || !infoUrl){
					infoUrl = defaultGetFeatureInfoUrl(referenceLayers[i]);
				}
				getLayerInfo(infoUrl,e);
				count++;
			}
		}
		if(forestLayerActive && map.hasLayer(forestLayerActive.wms)){
			var infoUrl = typeof(forestLayerActive.info) == 'object' ? forestLayerActive.info[lang] : forestLayerActive.info;
			if(typeof(infoUrl) == 'undefined' || !infoUrl){
				infoUrl = defaultGetFeatureInfoUrl(forestLayerActive);
			}
			getLayerInfo(infoUrl,e);
			count++;
		}
		if(!count){
			$('#info-no-data').show();
		}
	}
	
	$('#info-btn').on('click', function(){
		if($(this).hasClass('selected')){
			closeGetInfo();
		} else if(!$(this).hasClass('disabled')) {
			map._container.style.cursor = 'help';
			$(this).addClass('selected');
			map.on('contextmenu',function(e){
				closeGetInfo();
			});
			map.on('click', function(e){
				showFeatureInfo(e);
			})
		}
	})
	
	function closeGetInfo(){
		map.off('click');
		map.off('contextmenu');
		map._container.style.cursor = null;
		$('#info-btn').removeClass('selected');
	}

	
	//Draw
		
	$("#select-by-polygon, #quick-stat-select-by-polygon").on('click', function(){
		$('.leaflet-draw-toolbar').children()[0].click()
	})
	
	$("#select-by-point, #quick-stat-select-by-point").on('click', function(){
		$('.leaflet-draw-toolbar').children()[2].click()
	})
	
	map.on(L.Draw.Event.DRAWSTART, function (e) {
		drawnItems.clearLayers();
		$('#view-quick-report').hide();
	});
	
	map.on(L.Draw.Event.CREATED, function (e) {
		drawnItems.clearLayers();
		var layer = e.layer;
		layer.bindPopup(dictionary['Click on the object to delete'][lang]);
		layer.on('mouseover', function(e) {
			layer.openPopup();
		});
		layer.on('mouseout', function(e) {
			layer.closePopup();
		});
		drawnItems.addLayer(layer);
		$('#view-quick-report').show();
		$('.select-btn').removeClass('selected');
		$('#quick-stat-select button').css('background','transparent');
		layer.on('click',function(){
			$('.info-table-plot-count').remove();
			drawnItems.clearLayers();
			$('#quick-stat-source').change();
		})
		$("#select-widget").hide();
		varpGeom = pGeom = '', pLat = '', pLng = '', pRadius = '';
		if(layer instanceof L.Circle){
			var coords = layer.getLatLng()
			pLat = 'lat:' + coords.lat + ';';
			pLng = 'lng:' + coords.lng + ';';
			pRadius = 'radius:' + layer.getRadius() + ';';
		} else {
			var wkt = new Wkt.Wkt(); 
			wkt.fromObject(layer);
			var pGeom = 'geom:'+wkt.toLocaleString().replace(/,/g,'\\,')+',';
		}
		var defaultParameters = {
			viewparams: (pGeom + pLat + pLng + pRadius).slice(0, -1)
		};
		var parameters = L.Util.extend(defaultParameters); 
		var param = L.Util.getParamString(parameters); 
		param = param.substring(1);
		param = '&' + param; 
		var owsrootUrl = "http://maps.vnforest.gov.vn:802/geoserver/wfs?version=1.0.0&request=GetFeature&typeName=FRMS:dss_plot_count_2017&outputFormat=application/json";
		var URL = owsrootUrl + param;
		$("#info-container").text('');
		$('#info-container').append("<img src='images/load2.gif'>");
		$($( "#tabs-details" ).children('ul').children('li')[2]).show();
		$("#tabs-details").tabs( "option", "active", 2);
		var ajax = $.ajax({
			url : URL,
			dataType : 'json',
			success : function (response) {
				$($('#info-container').find('img')[0]).remove();
				$("#info-container").text('');
				$('#info-no-data').hide();
				var res = response.features[0].properties;
				$("#info-container").append("<table class='info-table-plot-count'><tbody><tr"+(!res.count?" style='background-color:#f84848;'":" ")+"><td>"+dictionary['Number of plots:'][lang]+"</td><td>"+res.count+"</td></tr><tr><td>"+dictionary['Plots area:'][lang]+"</td><td>"+Math.round(res.area)+" ha</td></tr></tbody></table>");
				$("#info-container").show();
			}, error: function(e){
				console.log(e);
			}
		});
	});
	
	
	//Measure
	
	$("#measure-btn").on('click', function(){
		if(!$('#measure-widget').is(':visible')){
			$('.measure-btn').removeClass('selected');
			$('.widget').hide();
			$('#measure-widget').show();
		} else {
			$('#measure-widget').hide();
			closeMeasure();
		}
	})
		
	var tooltip = document.getElementById('measure-tooltip');
	
	var measureControl = new L.Control.Measure({localization:lang}).addTo(map);
	$('.leaflet-control-measure').hide();
	map.on('measurefinish',function(e){
		closeMeasureArea();
		closeMeasureDistance();
	})
	
	$('.measure-btn').on('click', function(){
		closeMeasure();
		$('#unit').show();
		$(this).addClass('selected');
	})
	
	$('#measure-angle').on('click', function(){
		addUnits([['VN2000 (m)','m']]);
		$(tooltip).show();
		map._container.style.cursor = 'crosshair';
		map.on('mousemove', function(e){
			tooltip.style.left = e.containerPoint.x + 'px';
			tooltip.style.top = e.containerPoint.y + 'px';
			var bngproj = '+proj=utm +zone=48 +ellps=WGS84 +towgs84=-192.873,-39.382,-111.202,-0.00205,-0.0005,0.00335,0.0188 +units=m +no_defs';
			var bngcoords = proj4(bngproj, [e.latlng.lng, e.latlng.lat]);
			var x_arr = bngcoords[0].toString().split('.');
			var y_arr = bngcoords[1].toString().split('.');
			var coords = x_arr[0] + '.' + x_arr[1].substring(0,2) + ', '+ y_arr[0] + '.' + y_arr[1].substring(0,2);
			$(tooltip).text(coords);
		})
	})
	
	function closeMeasureAngle(){
		map._container.style.cursor = null;
		$(tooltip).hide();
		map.off('mousemove');
	}
	
	$('#measure-distance').on('click', function(){
		addUnits([['m','meters'],['km','kilometers']]);
		measureControl.options.primaryLengthUnit = $('#unit').val();
		measureControl.options.secondaryLengthUnit = null;
		measureControl._startMeasure('line');
	})
	
	function closeMeasureDistance(){
		if(measureControl._locked){
			measureControl._finishMeasure();
		}
		$('.measure-btn').removeClass('selected');
		$('#unit').hide();
		map.off('mousemove');
	}
	
	$('#measure-area').on('click', function(){
		addUnits([['hectares','hectares'],['km2','sqkilometers']]);
		measureControl.options.primaryAreaUnit = $('#unit').val();
		measureControl.options.secondaryAreaUnit = null;
		measureControl._startMeasure(null);
	})
	
	function closeMeasureArea(){
		if(measureControl._locked){
			measureControl._finishMeasure();
		}
		$('.measure-btn').removeClass('selected');
		$('#unit').hide();
		map.off('mousemove');
	}
	
	function closeMeasure(){
		measureControl._layer.clearLayers();
		$('#unit').hide();
		$('.measure-btn').removeClass('selected');
		closeMeasureAngle();
		closeMeasureDistance();
		closeMeasureArea();
	}
	
	map.on('zoomend', function(e){
		if(e.target._zoom>9){
			$("#unit").val($("#unit option:last").val());
		} else {
			$("#unit").val($("#unit option:first").val());
		};
		$("#unit").change();
	})
	
	$('#unit').on('change', function(){
		measureControl.options.primaryAreaUnit = $('#unit').val();
		measureControl.options.primaryLengthUnit = $('#unit').val();
	})
	
	$('.select-btn').on('click', function(){
		$('.select-btn').removeClass('selected');
		$(this).addClass('selected');
	})
	
	function addUnits(a){
		var sel = document.getElementById('unit');
		sel.innerHTML = "";
		$.each(a, function(){
			var opt = document.createElement('option');
			opt.appendChild( document.createTextNode(this[0]) );
			opt.value = this[1]; 
			sel.appendChild(opt); 
		})
	}
	
	
	//Print
	
	$("#print-btn").on('click', function(){
		var center = map.getCenter();
		$('#map-container').addClass('map-container-print');
		$('#map').addClass('map-print');
		map.setView(center);
		map.invalidateSize();
		var title = $('#map title');		
		title.text($(map.getContainer()).attr("title"));
	})
	
	$('#map-container-print-btn').on('click', function(){
		$('#map').print();
	})
	
	$('#map-container-goback-btn').on('click', function(){
		var center = map.getCenter();
		$('#map-container').removeClass('map-container-print');
		$('#map').removeClass('map-print');
		map.setView(center);
		map.invalidateSize();
	})
	
	$(document).keydown(function(e) {
		if (e.keyCode == 27) {
			$('#map-container-goback-btn').click();
		}   
	});
	
	//Language
	
	$('.lng-change').on('click', function(){
		if(this.id === 'lng-change-vi'){
			$('#lng-change-vi').hide();
			$('#lng-change-en').show();
		} else {
			$('#lng-change-en').hide();
			$('#lng-change-vi').show();
		}
	})
	
	$(function() {
		
		//Elements
		
		$( "#nav" ).buttonset();
		
		$( ".tab-button" ).button();
		
		$( "#forest-layers" ).accordion({
			collapsible: true,
			heightStyle: 'content',
			active: false
		});
		
		$( "#tabs-details" ).tabs();
		var li = $( "#tabs-details" ).children('ul').children('li');
		$(li[1]).hide();
		$(li[2]).hide();
		$( "#tabs-search" ).tabs();
		$( "#tabs-share" ).tabs();
		
		$( "#layer-details" ).accordion({
			collapsible: true,
			heightStyle: 'content',
			active: false
		});
		
		$( "#slider" ).slider({
		  value: 100,
		  change: function(event, ui){
				  if(forestLayerActive && map.hasLayer(forestLayerActive.wms)){
						forestLayerActive.wms.setOpacity(ui.value/100);
				  }
			  }
		});
		
		$( "#tabs-report-date1" ).datepicker({
			dateFormat : "dd-mm-yy",
			showOn: "both",
			buttonImage: "images/calendar.png",
			buttonImageOnly: true,
			buttonText: "Select date"
		});
		$( "#tabs-report-date2" ).datepicker({
			dateFormat : "dd-mm-yy",
			showOn: "both",
			buttonImage: "images/calendar.png",
			buttonImageOnly: true,
			buttonText: "Select date",
			defaultDate: "+1y"
		});
		$( "#tabs-report-date1" ).datepicker('setDate', "-1y");
		$( "#tabs-report-date2" ).datepicker('setDate', "-0d");
		
		$( "#data-sets-date1" ).datepicker({
			dateFormat : "yy-mm-dd",
			showOn: "both",
			buttonImage: "images/calendar.png",
			buttonImageOnly: true,
			buttonText: "Select date"
		});
		$( "#data-sets-date2" ).datepicker({
			dateFormat : "yy-mm-dd",
			showOn: "both",
			buttonImage: "images/calendar.png",
			buttonImageOnly: true,
			buttonText: "Select date"
		});
		$( "#data-sets-date1" ).datepicker('setDate', new Date());
		$( "#data-sets-date2" ).datepicker('setDate', new Date());
		
		$( "#quick-stat-date1" ).datepicker({
			dateFormat : "dd-mm-yy",
			showOn: "both",
			buttonImage: "images/calendar.png",
			buttonImageOnly: true,
			buttonText: "Select date"
		});
		$( "#quick-stat-date2" ).datepicker({
			dateFormat : "dd-mm-yy",
			showOn: "both",
			buttonImage: "images/calendar.png",
			buttonImageOnly: true,
			buttonText: "Select date"
		});
		$( "#quick-stat-date1" ).datepicker('setDate', new Date());
		$( "#quick-stat-date2" ).datepicker('setDate', new Date());
		
		
		//Dialogs
		
		$('#dialog-quick-statistics').dialog({ 
			minWidth:680,
			maxHeight: $(window).height() - 95, 
			position: { my: "left top+2", at: "left bottom", of: $('#nav') },
			autoOpen: false
		});
		
		$('#dialog-signin').dialog({ 
			width:311,
			maxHeight: $(window).height() - 95, 
			position: { my: "center center", at: "center center", of: $('body') },
			autoOpen: false
		});
		
		$( "#dialog-details" ).dialog({ 
			width: 'auto',
			maxHeight: $(window).height() - 105,
			dialogClass: 'noTitleStuff', 
			position: { my: "left top+2", at: "left bottom", of: $('#nav') },
			autoOpen: false,
			open: function(){
				$( "#dialog-details" ).css( "maxWidth", $(window).width() - 35 );
			}
		});
		
		$( "#dialog-forest-layers" ).dialog({ 
			width:340, 
			minHeight: 'auto',
			dialogClass: 'noTitleStuff', 
			position: { my: "left top", at: "left bottom", of: $('#radio1').next() },
			autoOpen: false
		});
		
		$( "#dialog-base-layers" ).dialog({ 
			width:200, 
			dialogClass: 'noTitleStuff', 
			position: { my: "left top", at: "left bottom", of: $('#radio2').next() },
			autoOpen: false
		});
		
		$( "#dialog-reference-layers" ).dialog({ 
			width:220, 
			dialogClass: 'noTitleStuff', 
			position: { my: "left top", at: "left bottom", of: $('#radio6').next() },
			autoOpen: false
		});
		
		$( "#dialog-report" ).dialog({ 
			width:380, 
			dialogClass: 'noTitleStuff', 
			position: { my: "left top", at: "left bottom", of: $('#radio3').next() },
			autoOpen: false,
			open: function(){
				if(forestLayerActive && forestLayerActive.wms){
					var lr = forestLayerActive.wms.options.layers;
					$('#quick-stat-data-set').val(forestLayerActive.dataset);
					$('#quick-stat-data-set').change();
					if($("#quick-stat-type option[value='"+lr+"_QS']").length){
						$('#quick-stat-type').val(lr+'_QS');
					}
				}
				$('#quick-stat-source').val(0);
				$('#quick-stat-source').change();
			},
			close: function(){
				drawnItems.clearLayers();
			}
		});
		
		$( "#dialog-search" ).dialog({ 
			width:300, 
			dialogClass: 'noTitleStuff', 
			position: { my: "left top", at: "left bottom", of: $('#radio7').next() },
			autoOpen: false
		});
		
		$( "#dialog-details" ).dialog('open');
		
		
		//Events
		
		$('#dialog-details').on('click', function(){
			$('.dialog-menu').dialog('close');
		})
		
		$('#map').on('click', function() {
			$('#dialog-search').dialog('close');
			$('#dialog-forest-layers').dialog('close');
			$('#dialog-base-layers').dialog('close');
			if(!drawControl._toolbars.draw._activeMode){
				$('#dialog-report').dialog('close');
			}
			$('#dialog-quick-statistics').dialog('close');
			$( "#dialog-reference-layers" ).dialog('close');
			$('#nav input').removeAttr('checked');
			$( "#nav" ).buttonset('refresh');
		})
		
		$('html').on('click', function(){
			if($('#search').is(':visible')){
				$('#search').hide();
			} else if($('#measure-widget').is(':visible')){
				$('#measure-widget').hide();
				closeMeasure();
			} else if($('#select-widget').is(':visible')){
				$('#select-widget').hide();
			} else if($('#fos').is(':visible')){
				$('#fos').hide();
			}
		})
		
		$('#measure-widget,#select-widget').on('click', function(event){
			event.stopPropagation();
		})
		
		$("#search, #select-btn, #measure-btn, #fos").on('click', function(event){
			event.stopPropagation();
			closeGetInfo();
			closeMeasure();
		})
		
		$( "#radio1" ).click(function(event){
			event.stopPropagation();
			if($( "#dialog-forest-layers" ).dialog('isOpen')){
				$('.dialog-menu').dialog('close');
				$('#nav input').removeAttr('checked');
				$( "#nav" ).buttonset('refresh');
			} else {
				$( "#dialog-base-layers" ).dialog('close');
				$( "#dialog-report" ).dialog('close');
				$( "#dialog-search" ).dialog('close');
				$( "#dialog-forest-layers" ).dialog('open');
			}
		});
		
		$( "#radio2" ).click(function(event){
			event.stopPropagation();
			if($( "#dialog-base-layers" ).dialog('isOpen')){
				$('.dialog-menu').dialog('close');
				$('#nav input').removeAttr('checked');
				$( "#nav" ).buttonset('refresh');
			} else {
				$( "#dialog-forest-layers" ).dialog('close');
				$( "#dialog-report" ).dialog('close');
				$( "#dialog-search" ).dialog('close');
				$( "#dialog-base-layers" ).dialog('open');
			}
		});
		
		$( "#radio6" ).click(function(event){
			event.stopPropagation();
			$( "#dialog-reference-layers" ).dialog('open');
		});
		
		$( "#radio7" ).click(function(event){
			event.stopPropagation();
			if($( "#dialog-search" ).dialog('isOpen')){
				$('.dialog-menu').dialog('close');
				$('#nav input').removeAttr('checked');
				$( "#nav" ).buttonset('refresh');
			} else {
				$( "#dialog-forest-layers" ).dialog('close');
				$( "#dialog-report" ).dialog('close');
				$( "#dialog-base-layers" ).dialog('close');
				$( "#dialog-search" ).dialog('open');
			}
		});
		
		$( "#radio3" ).click(function(event){
			event.stopPropagation();
			if($( "#dialog-report" ).dialog('isOpen')){
				$('.dialog-menu').dialog('close');
				$('#nav input').removeAttr('checked');
				$( "#nav" ).buttonset('refresh');
			} else {
				$( "#dialog-forest-layers" ).dialog('close');
				$( "#dialog-search" ).dialog('close');
				$( "#dialog-base-layers" ).dialog('close');
				$( "#dialog-report" ).dialog('open');
			}
		});
		
		$( "#radio4" ).click(function(event){
			event.stopPropagation();
			var url = "help/"+lang+"/DataSets.htm";
			var win = window.open(url, '_blank');
			win.focus();
			$('#nav input').removeAttr('checked');
			$( "#nav" ).buttonset('refresh');
		});
		
		$( "#radio5" ).click(function(event){
			event.stopPropagation();
			window.open('help/'+lang,'_blank');
			$('#nav input').removeAttr('checked');
			$( "#nav" ).buttonset('refresh');
		});
		
		$('#dialog-details-close').on('click', function(){
			$( "#dialog-details" ).dialog('close');
			$( "#dialog-details-open" ).show();
		})
		
		$('#dialog-details-open').on('click', function(){
			$( "#dialog-details" ).dialog('open');
			$(this).hide();
		})

		$.each($('.ui-menu-item'), function(){
			if($(this).hasClass('checkable')){
				$(this).removeClass('ui-menu-item');
			}
		}); 
		
	});
	
		// Hash functionality
	
	
	var hashLayers = {};
	
	$.each(referenceLayersList, function(j){ //create menu based on array referenceLayersList
		$.each(this.layers, function(i){	
			hashLayers['ref'+j+'lr'+i] = this.wms;
			if(location.hash.search('ref'+j+'lr'+i)>0){			
				this.li.click();
			}
		})
	})
	
	$.each(forestLayersList, function(j){ //create menu based on array forestLayersList
		$.each(this.layers, function(i){	
			hashLayers['forest'+j+'lr'+i] = this.wms.wms;
			if(location.hash.search('forest'+j+'lr'+i)>0){			
				this.li.click();
			}
		})
	})
	
	var allMapLayers = {
		'base0': topo,
		'base1':baseEsriImagery,
		'base2':baseHillShade,
		'base3':reliefRGB,
		'base4':hansen,
		'base5':baseLayerEmpty
	};
	allMapLayers = jQuery.extend(allMapLayers,hashLayers);
	var hash = new L.Hash(map, allMapLayers);
	
	
	// Locate
	setTimeout(function(){ 
		L.control.locate({ 
			position: 'topright', 
			cacheLocation: true, 
			drawCircle: true, 
			showPopup: false,
		}).addTo(map);
	}, 500);
	
	
	
	
});