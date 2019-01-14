var quickStatisticsList = [
	{
		name: dictionary['Forest resource data'][lang]+' 2017',
		types: [
			{
				name: dictionary['Forest use'][lang],
				layer: 'FRMS:Forest_use_situation_2017_QS'
			},
			{
				name: dictionary['Forest function'][lang],
				layer: 'FRMS:Forest_function_main_2017_QS'
			},
			{
				name: dictionary['Forest function, sub-class'][lang],
				layer: 'FRMS:Forest_function_subtype_2017_QS'
			},
			{
				name: dictionary['Forest type'][lang],
				layer: 'FRMS:Forest_type_2017_QS'
			},
			{
				name: dictionary['Forest origin'][lang],
				layer: 'FRMS:Forest_origin_2017_QS'
			},
				{
				name: dictionary['Volume'][lang],
				layer: 'FRMS:Stand_volume_2017_QS'
			},
			{
				name: dictionary['Site condition'][lang],
				layer: 'FRMS:Site_condition_2017_QS'
			},
			{
				name: dictionary['Forest owner type'][lang],
				layer: 'FRMS:Forest_owner_type_2017_QS'
			},
			{
				name: dictionary['Land use certificate'][lang],
				layer: 'FRMS:Land_use_certificate_2017_QS'
			}
		]
	},
	{
		name: dictionary['Forest resource data'][lang]+' 2016',
		types: [
			{
				name: dictionary['Forest use'][lang],
				layer: 'FRMS:Forest_use_situation_QS'
			},
			{
				name: dictionary['Forest function'][lang],
				layer: 'FRMS:Forest_function_main_QS'
			},
			{
				name: dictionary['Forest function, sub-class'][lang],
				layer: 'FRMS:Forest_function_subtype_QS'
			},
			{
				name: dictionary['Forest type'][lang],
				layer: 'FRMS:Forest_type_QS'
			},
			{
				name: dictionary['Forest origin'][lang],
				layer: 'FRMS:Forest_origin_QS'
			},
				{
				name: dictionary['Volume'][lang],
				layer: 'FRMS:Stand_volume_QS'
			},
			{
				name: dictionary['Site condition'][lang],
				layer: 'FRMS:Site_condition_QS'
			},
			{
				name: dictionary['Forest owner type'][lang],
				layer: 'FRMS:Forest_owner_type_QS'
			},
			{
				name: dictionary['Land use certificate'][lang],
				layer: 'FRMS:Land_use_certificate_QS'
			}
		]
	}
]


var crs3405 = new L.Proj.CRS('EPSG:3405',
	'+proj=utm +zone=48 +ellps=WGS84 +units=m +no_defs'
);

var forestLayersList = [
	{
		name: dictionary['Forest resource data'][lang]+' 2017',
		layers:[
			{	
				name: dictionary['Forest use'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/gwc/service/wms',
				layers:'FRMS:Forest_use_situation_2017',
				legend: { 
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Use_Situation_en&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Use_Situation&SCALE=5000"
				},
				minZoom: 13,
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_2017_en&LAYERS=dss_plot_info_2017_en&INFO_FORMAT=text/html",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_2017_vn&LAYERS=dss_plot_info_2017_vn&INFO_FORMAT=text/html"
				}
			},
			{
				name: dictionary['Forest function'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/gwc/service/wms',
				layers:'FRMS:Forest_function_main_2017',
				legend: { 
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Function_Main_en&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Function_Main&SCALE=5000"
				},
				minZoom: 13,
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_2017_en&LAYERS=dss_plot_info_2017_en&INFO_FORMAT=text/html",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_2017_vn&LAYERS=dss_plot_info_2017_vn&INFO_FORMAT=text/html"
				}
			},
			{
				name: dictionary['Forest function, sub-class'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/gwc/service/wms',
				layers:'FRMS:Forest_function_subtype_2017',
				legend: { 
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Function_Sub-type_en&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Function_Sub-type&SCALE=5000"
				},
				minZoom: 13,
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_2017_en&LAYERS=dss_plot_info_2017_en&INFO_FORMAT=text/html",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_2017_vn&LAYERS=dss_plot_info_2017_vn&INFO_FORMAT=text/html"
				}
			},
			{
				name: dictionary['Forest type'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/gwc/service/wms',
				layers:'FRMS:Forest_type_2017',
				legend: { 
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Type_en&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Type&SCALE=5000"
				},
				minZoom: 13,
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_2017_en&LAYERS=dss_plot_info_2017_en&INFO_FORMAT=text/html",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_2017_vn&LAYERS=dss_plot_info_2017_vn&INFO_FORMAT=text/html"
				}
			},
			{
				name: dictionary['Forest origin'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/gwc/service/wms',
				layers:'FRMS:Forest_origin_2017',
				legend: { 
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Origin_en&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Origin&SCALE=5000"
				},
				minZoom: 13,
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_2017_en&LAYERS=dss_plot_info_2017_en&INFO_FORMAT=text/html",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_2017_vn&LAYERS=dss_plot_info_2017_vn&INFO_FORMAT=text/html"
				}
			},
			{
				name: dictionary['Volume'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/gwc/service/wms',
				layers:'FRMS:Stand_volume_2017',
				legend: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:FRMS_stand_volume&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:FRMS_stand_volume&SCALE=5000"
				},
				minZoom: 13,
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_2017_en&LAYERS=dss_plot_info_2017_en&INFO_FORMAT=text/html",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_2017_vn&LAYERS=dss_plot_info_2017_vn&INFO_FORMAT=text/html"
				}
			},
			{
				name: dictionary['Site condition'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/gwc/service/wms',
				layers:'FRMS:Site_condition_2017',
				legend: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Site_Condition_en&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Site_Condition&SCALE=5000"
				},
				minZoom: 13,
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_2017_en&LAYERS=dss_plot_info_2017_en&INFO_FORMAT=text/html",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_2017_vn&LAYERS=dss_plot_info_2017_vn&INFO_FORMAT=text/html"
				}
			},
			{
				name: dictionary['Forest owner type'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/gwc/service/wms',
				layers:'FRMS:Forest_owner_type_2017',
				legend: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Owner_Type_en&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Owner_Type&SCALE=5000"
				},
				minZoom: 13,
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_2017_en&LAYERS=dss_plot_info_2017_en&INFO_FORMAT=text/html",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_2017_vn&LAYERS=dss_plot_info_2017_vn&INFO_FORMAT=text/html"
				}
			},
			{
				name: dictionary['Land use certificate'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/gwc/service/wms',
				layers:'FRMS:Land_use_certificate_2017',
				legend: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Land_Use_Certificate_en&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Land_Use_Certificate&SCALE=5000"
				},
				minZoom: 13,
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_2017_en&LAYERS=dss_plot_info_2017_en&INFO_FORMAT=text/html",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_2017_vn&LAYERS=dss_plot_info_2017_vn&INFO_FORMAT=text/html"
				}
			}
		]
	},
	{
		name: dictionary['Forest resource data'][lang]+' 2016',
		layers:[
			{	
				name: dictionary['Forest use'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/gwc/service/wms',
				layers:'FRMS:Forest_use_situation',
				legend: { 
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Use_Situation_en&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Use_Situation&SCALE=5000"
				},
				minZoom: 13,
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_en&LAYERS=dss_plot_info_en&INFO_FORMAT=text/html",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_vn&LAYERS=dss_plot_info_vn&INFO_FORMAT=text/html"
				}
			},
			{
				name: dictionary['Forest function'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/gwc/service/wms',
				layers:'FRMS:Forest_function_main',
				legend: { 
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Function_Main_en&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Function_Main&SCALE=5000"
				},
				minZoom: 13,
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_en&LAYERS=dss_plot_info_en&INFO_FORMAT=text/html",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_vn&LAYERS=dss_plot_info_vn&INFO_FORMAT=text/html"
				}
			},
			{
				name: dictionary['Forest function, sub-class'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/gwc/service/wms',
				layers:'FRMS:Forest_function_subtype',
				legend: { 
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Function_Sub-type_en&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Function_Sub-type&SCALE=5000"
				},
				minZoom: 13,
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_en&LAYERS=dss_plot_info_en&INFO_FORMAT=text/html",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_vn&LAYERS=dss_plot_info_vn&INFO_FORMAT=text/html"
				}
			},
			{
				name: dictionary['Forest type'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/gwc/service/wms',
				layers:'FRMS:Forest_type',
				legend: { 
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Type_en&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Type&SCALE=5000"
				},
				minZoom: 13,
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_en&LAYERS=dss_plot_info_en&INFO_FORMAT=text/html",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_vn&LAYERS=dss_plot_info_vn&INFO_FORMAT=text/html"
				}
			},
			{
				name: dictionary['Forest origin'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/gwc/service/wms',
				layers:'FRMS:Forest_origin',
				legend: { 
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Origin_en&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Origin&SCALE=5000"
				},
				minZoom: 13,
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_en&LAYERS=dss_plot_info_en&INFO_FORMAT=text/html",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_vn&LAYERS=dss_plot_info_vn&INFO_FORMAT=text/html"
				}
			},
			{
				name: dictionary['Volume'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/gwc/service/wms',
				layers:'FRMS:Stand_volume',
				legend: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:FRMS_stand_volume&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:FRMS_stand_volume&SCALE=5000"
				},
				minZoom: 13,
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_en&LAYERS=dss_plot_info_en&INFO_FORMAT=text/html",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_vn&LAYERS=dss_plot_info_vn&INFO_FORMAT=text/html"
				}
			},
			{
				name: dictionary['Site condition'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/gwc/service/wms',
				layers:'FRMS:Site_condition',
				legend: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Site_Condition_en&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Site_Condition&SCALE=5000"
				},
				minZoom: 13,
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_en&LAYERS=dss_plot_info_en&INFO_FORMAT=text/html",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_vn&LAYERS=dss_plot_info_vn&INFO_FORMAT=text/html"
				}
			},
			{
				name: dictionary['Forest owner type'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/gwc/service/wms',
				layers:'FRMS:Forest_owner_type',
				legend: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Owner_Type_en&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Owner_Type&SCALE=5000"
				},
				minZoom: 13,
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_en&LAYERS=dss_plot_info_en&INFO_FORMAT=text/html",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_vn&LAYERS=dss_plot_info_vn&INFO_FORMAT=text/html"
				}
			},
			{
				name: dictionary['Land use certificate'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/gwc/service/wms',
				layers:'FRMS:Land_use_certificate',
				legend: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Land_Use_Certificate_en&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Land_Use_Certificate&SCALE=5000"
				},
				minZoom: 13,
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_en&LAYERS=dss_plot_info_en&INFO_FORMAT=text/html",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_vn&LAYERS=dss_plot_info_vn&INFO_FORMAT=text/html"
				}
			}
		]
	},
	{
		name: dictionary['National Forest Inventory and Statistics (NFIS)'][lang],
		layers:[
			{	
				name: dictionary['Forest use'][lang],
				url:'http://maps.vnforest.gov.vn:9763/geoserver/wms',
				layers:'nfis:NFIS_Site_use_situation',
				crs: crs3405,
				legend: { 
					en: "http://maps.vnforest.gov.vn:9763/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&STRICT=false&SCALE=5000&style=NFIS_Forest_use_situation&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Use_Situation&SCALE=5000"
				},
				minZoom: 13
			},
			{
				name: dictionary['Forest function'][lang],
				url:'http://maps.vnforest.gov.vn:9763/geoserver/wms',
				layers:'nfis:NFIS_Forest_Function_Main',
				crs: crs3405,
				legend: { 
					en: "http://maps.vnforest.gov.vn:9763/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&STRICT=false&SCALE=5000&style=NFIS_Forest_Function_Main&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Function_Main&SCALE=5000"
				},
				minZoom: 13
			},
			{
				name: dictionary['Forest function, sub-class'][lang],
				url:'http://maps.vnforest.gov.vn:9763/geoserver/wms',
				layers:'nfis:NFIS_Forest_function_subclass',
				crs: crs3405,
				legend: { 
					en: "http://maps.vnforest.gov.vn:9763/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&STRICT=false&SCALE=5000&style=NFIS_Forest_function_sub_class&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Function_Sub-type&SCALE=5000"
				},
				minZoom: 13
			},
			{
				name: dictionary['Forest type'][lang],
				url:'http://maps.vnforest.gov.vn:9763/geoserver/wms',
				layers:'nfis:NFIS_Forest_type',
				crs: crs3405,
				legend: { 
					en: "http://maps.vnforest.gov.vn:9763/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&SCALE=5000&style=NFIS_Forest_type",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Type&SCALE=5000"
				},
				minZoom: 13
			},
			{
				name: dictionary['Forest origin'][lang],
				url:'http://maps.vnforest.gov.vn:9763/geoserver/wms',
				layers:'nfis:NFIS_Forest_origin',
				legend: { 
					en: "http://maps.vnforest.gov.vn:9763/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&SCALE=5000&style=NFIS_Forest_Origin",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Origin&SCALE=5000"
				},
				minZoom: 13
			},
			{
				name: dictionary['Volume'][lang],
				url:'http://maps.vnforest.gov.vn:9763/geoserver/wms',
				layers:'nfis:NFIS_StandVolume',
				legend: {
					en: "http://maps.vnforest.gov.vn:9763/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&SCALE=5000&style=NFIS_StandVolume",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:FRMS_stand_volume&SCALE=5000"
				},
				minZoom: 13
			},
			{
				name: dictionary['Site condition'][lang],
				url:'http://maps.vnforest.gov.vn:9763/geoserver/wms',
				layers:'nfis:NFIS_Site_condition',
				legend: {
					en: "http://maps.vnforest.gov.vn:9763/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=NFIS_Site_condition&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Site_Condition&SCALE=5000"
				},
				minZoom: 13
			},
			{
				name: dictionary['Forest owner type'][lang],
				url:'http://maps.vnforest.gov.vn:9763/geoserver/wms',
				layers:'nfis:NFIS_Forest_owner_type',
				legend: {
					en: "http://maps.vnforest.gov.vn:9763/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=NFIS_Forest_owner_type&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Forest_Owner_Type&SCALE=5000"
				},
				minZoom: 13
			},
			{
				name: dictionary['Land use certificate'][lang],
				url:'http://maps.vnforest.gov.vn:9763/geoserver/wms',
				layers:'nfis:NFIS_Land_use_certificate',
				legend: {
					en: "http://maps.vnforest.gov.vn:9763/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=NFIS_Landuse_certificate&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=FRMS:Land_Use_Certificate&SCALE=5000"
				},
				minZoom: 13
			}
		]
	},
	{
		name: dictionary['National Forest Inventories (NFI) 1990-2010'][lang],
		layers:[
			{
				name: dictionary['Forest type 1990'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/five_cycle_inventory_data/wms',
				layers:'five_cycle_inventory_data:cycle1990_forest_type',
				legend: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=five_cycle_inventory_data:five_cycle_forest_type_en&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=five_cycle_inventory_data:five_cycle_forest_type&SCALE=5000"
				},
				minZoom: 11,
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/five_cycle_inventory_data/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&QUERY_LAYERS=five_cycle_inventory_data:dss_cycle1990_forest_type_info_en&LAYERS=five_cycle_inventory_data:dss_cycle1990_forest_type_info_en&INFO_FORMAT=text/html",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/five_cycle_inventory_data/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&QUERY_LAYERS=five_cycle_inventory_data:dss_cycle1990_forest_type_info_vn&LAYERS=five_cycle_inventory_data:dss_cycle1990_forest_type_info_vn&INFO_FORMAT=text/html"
				}
			},
			{
				name: dictionary['Forest type 1995'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/five_cycle_inventory_data/wms',
				layers:'five_cycle_inventory_data:cycle1995_forest_type',
				legend: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=five_cycle_inventory_data:five_cycle_forest_type_en&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=five_cycle_inventory_data:five_cycle_forest_type&SCALE=5000"
				},
				minZoom: 11,
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=five_cycle_inventory_data:dss_cycle1995_forest_type_info_en&LAYERS=five_cycle_inventory_data:dss_cycle1995_forest_type_info_en&INFO_FORMAT=text%2Fhtml",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=five_cycle_inventory_data:dss_cycle1995_forest_type_info_vn&LAYERS=five_cycle_inventory_data:dss_cycle1995_forest_type_info_vn&INFO_FORMAT=text%2Fhtml"
				}
			},
			{
				name: dictionary['Forest type 2000'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/five_cycle_inventory_data/wms',
				layers:'five_cycle_inventory_data:cycle2000_forest_type',
				legend: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=five_cycle_inventory_data:five_cycle_forest_type_en&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=five_cycle_inventory_data:five_cycle_forest_type&SCALE=5000"
				},
				minZoom: 11,
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=five_cycle_inventory_data:dss_cycle2000_forest_type_info_en&LAYERS=five_cycle_inventory_data:dss_cycle2000_forest_type_info_en&INFO_FORMAT=text%2Fhtml",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=five_cycle_inventory_data:dss_cycle2000_forest_type_info_vn&LAYERS=five_cycle_inventory_data:dss_cycle2000_forest_type_info_vn&INFO_FORMAT=text%2Fhtml"
				}
			},
			{
				name: dictionary['Forest type 2005'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/five_cycle_inventory_data/wms',
				layers:'five_cycle_inventory_data:cycle2005_forest_type',
				legend: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=five_cycle_inventory_data:five_cycle_forest_type_en&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=five_cycle_inventory_data:five_cycle_forest_type&SCALE=5000"
				},
				minZoom: 11,
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=five_cycle_inventory_data:dss_cycle2005_forest_type_info_en&LAYERS=five_cycle_inventory_data:dss_cycle2005_forest_type_info_en&INFO_FORMAT=text%2Fhtml",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=five_cycle_inventory_data:dss_cycle2005_forest_type_info_vn&LAYERS=five_cycle_inventory_data:dss_cycle2005_forest_type_info_vn&INFO_FORMAT=text%2Fhtml"
				}
			},
			{
				name: dictionary['Forest type 2010'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/five_cycle_inventory_data/wms',
				layers:'five_cycle_inventory_data:cycle2010_forest_type',
				legend: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=five_cycle_inventory_data:five_cycle_forest_type_en&SCALE=5000",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&STRICT=false&style=five_cycle_inventory_data:five_cycle_forest_type&SCALE=5000"
				},
				minZoom: 11,
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=five_cycle_inventory_data:dss_cycle2010_forest_type_info_en&LAYERS=five_cycle_inventory_data:dss_cycle2010_forest_type_info_en&INFO_FORMAT=text%2Fhtml",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=five_cycle_inventory_data:dss_cycle2010_forest_type_info_vn&LAYERS=five_cycle_inventory_data:dss_cycle2010_forest_type_info_vn&INFO_FORMAT=text%2Fhtml"
				}
			}
		]
	},
	{
		name: dictionary['Potential for REDD+ and afforestation (JICA study)'][lang],
		layers:[
			{
				name: dictionary['Deforestation in 5 years, 1990-1995'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/five_cycle_inventory_data/wms',
				layers:'five_cycle_inventory_data:cycles_1990_1995',
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/five_cycle_inventory_data/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&QUERY_LAYERS=five_cycle_inventory_data:dss_cycles_1990_1995_info_en&LAYERS=five_cycle_inventory_data:dss_cycles_1990_1995_info_en&INFO_FORMAT=text/html",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/five_cycle_inventory_data/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&QUERY_LAYERS=five_cycle_inventory_data:dss_cycles_1990_1995_info_vn&LAYERS=five_cycle_inventory_data:dss_cycles_1990_1995_info_vn&INFO_FORMAT=text/html"
				}
			},
			{
				name: dictionary['Deforestation in 5 years, 1995-2000'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/five_cycle_inventory_data/wms',
				layers:'five_cycle_inventory_data:cycles_1995_2000',
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/five_cycle_inventory_data/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&QUERY_LAYERS=five_cycle_inventory_data:dss_cycles_1995_2000_info_en&LAYERS=five_cycle_inventory_data:dss_cycles_1995_2000_info_en&INFO_FORMAT=text/html",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/five_cycle_inventory_data/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&QUERY_LAYERS=five_cycle_inventory_data:dss_cycles_1995_2000_info_vn&LAYERS=five_cycle_inventory_data:dss_cycles_1995_2000_info_vn&INFO_FORMAT=text/html"
				}
			},
			{
				name: dictionary['Deforestation in 5 years, 2000-2005'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/five_cycle_inventory_data/wms',
				layers:'five_cycle_inventory_data:cycles_2000_2005',
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/five_cycle_inventory_data/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&QUERY_LAYERS=five_cycle_inventory_data:dss_cycles_2000_2005_info_en&LAYERS=five_cycle_inventory_data:dss_cycles_2000_2005_info_en&INFO_FORMAT=text/html",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/five_cycle_inventory_data/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&QUERY_LAYERS=five_cycle_inventory_data:dss_cycles_2000_2005_info_vn&LAYERS=five_cycle_inventory_data:dss_cycles_2000_2005_info_vn&INFO_FORMAT=text/html"
				}
			},
			{
				name: dictionary['Deforestation in 5 years, 2005-2010'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/five_cycle_inventory_data/wms',
				layers:'five_cycle_inventory_data:cycles_2005_2010',
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/five_cycle_inventory_data/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&QUERY_LAYERS=five_cycle_inventory_data:dss_cycles_2005_2010_info_en&LAYERS=five_cycle_inventory_data:dss_cycles_2005_2010_info_en&INFO_FORMAT=text/html",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/five_cycle_inventory_data/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&QUERY_LAYERS=five_cycle_inventory_data:dss_cycles_2005_2010_info_vn&LAYERS=five_cycle_inventory_data:dss_cycles_2005_2010_info_vn&INFO_FORMAT=text/html"
				}
			},
			{
				name: dictionary['Deforestation in 10 years, 1990-2000'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/five_cycle_inventory_data/wms',
				layers:'five_cycle_inventory_data:cycles10y_1990_2000',
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/five_cycle_inventory_data/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&QUERY_LAYERS=five_cycle_inventory_data:dss_cycles_1990_2000_info_en&LAYERS=five_cycle_inventory_data:dss_cycles_1990_2000_info_en&INFO_FORMAT=text/html",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/five_cycle_inventory_data/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&QUERY_LAYERS=five_cycle_inventory_data:dss_cycles_1990_2000_info_vn&LAYERS=five_cycle_inventory_data:dss_cycles_1990_2000_info_vn&INFO_FORMAT=text/html"
				}
			},
			{
				name: dictionary['Deforestation in 10 years, 2000-2010'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/five_cycle_inventory_data/wms',
				layers:'five_cycle_inventory_data:cycles10y_2000_2010',
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/five_cycle_inventory_data/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&QUERY_LAYERS=five_cycle_inventory_data:dss_cycles_2000_2010_info_en&LAYERS=five_cycle_inventory_data:dss_cycles_2000_2010_info_en&INFO_FORMAT=text/html",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/five_cycle_inventory_data/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&QUERY_LAYERS=five_cycle_inventory_data:dss_cycles_2000_2010_info_vn&LAYERS=five_cycle_inventory_data:dss_cycles_2000_2010_info_vn&INFO_FORMAT=text/html"
				}
			},
			{
				name: dictionary['Potential REDD+ and afforestation/deforestation project area'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/five_cycle_inventory_data/wms',
				layers:'nfis:cycles_potential_map',
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/five_cycle_inventory_data/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&QUERY_LAYERS=five_cycle_inventory_data:dss_cycles_1990_1995_info_en&LAYERS=five_cycle_inventory_data:dss_cycles_1990_1995_info_en&INFO_FORMAT=text/html",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/five_cycle_inventory_data/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&QUERY_LAYERS=five_cycle_inventory_data:dss_cycles_1990_1995_info_vn&LAYERS=five_cycle_inventory_data:dss_cycles_1990_1995_info_vn&INFO_FORMAT=text/html"
				}
			}
		]
	}
];

var referenceLayersList = [
	{
		name: dictionary[''][lang],
		layers:[
			{ 
				name: dictionary['Topographic map layers'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/dss/wms',
				layers:'dss:topography',
				info: -1
			},
			{
				name: dictionary['Protected areas'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/dss/wms',
				layers:'dss:protected_areas',
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/dss/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=dss%3Adss_protected_areas_info_en&STYLES&LAYERS=dss%3Adss_protected_areas_info_en&INFO_FORMAT=text%2Fhtml",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/dss/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=dss%3Adss_protected_areas_info_vn&STYLES&LAYERS=dss%3Adss_protected_areas_info_vn&INFO_FORMAT=text%2Fhtml"
				}
			}
		]
	},
	{
		name: dictionary['Administrative boundaries'][lang],
		layers:[
			{
				name: dictionary['Administrative boundaries'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/wms',
				layers:'adm_boundaries',
				info: -1
			},
			{
				name: dictionary['Forest management unit boundaries'][lang],
				url:'http://maps.vnforest.gov.vn:802/geoserver/wms',
				layers:'forest_mng_boundaries',
				info: {
					en: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_2017_en&LAYERS=dss_plot_info_2017_en&INFO_FORMAT=text/html",
					vn: "http://maps.vnforest.gov.vn:802/geoserver/wms?SERVICE=WMS&VERSION=1.0.0&REQUEST=GetFeatureInfo&FORMAT=image/png&TRANSPARENT=true&QUERY_LAYERS=FRMS:dss_plot_info_2017_vn&LAYERS=dss_plot_info_2017_vn&INFO_FORMAT=text/html"
				}
			}
		]
	}
];