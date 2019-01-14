
<html>
<head>

	<?php 
		include('dictionary.php');
		
		// Detect the language version
		$lang = 'en';
		$langLong = 'en_US';
		$url = $_SERVER['REQUEST_URI'];
		$end = end((explode('/', rtrim($url, '/'))));
		if($end == 'vn'){
			$lang = 'vn';
			$langLong = 'vn_VN';
		}
		
		function dictionary($name) {
			global $dictionaryArray, $lang;
			if(isset($dictionaryArray[$name])){
				return $dictionaryArray[$name][$lang];
			} else {
				return $name;
			}
		}
		
		if(isset($_GET['fullscreen'])){
			$fullScreen = 1;
		} else {
			$fullScreen = 0;
		}
	?>
	<script>
		var dictionary = <?php echo json_encode($dictionaryArray); ?>;
		var dictionary_attr = <?php echo json_encode($dictionaryAttr); ?>;
		var user = <?php if( isset($user) ) { echo json_encode($user); } else { echo 'null'; }  ?>;
		var lang = "<?php echo $lang; ?>";
		var langLong = "<?php echo $langLong; ?>";
	</script>
	<meta name="language" content="<?php echo $lang; ?>">
	<meta http-equiv="content-language" content="<?php echo $lang; ?>">
	<link rel="icon" href="images/VNforest_Logo.png" type="image/x-icon"/>
	<title><?php echo dictionary('Forestry Data Sharing System'); ?></title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<script src="js/jquery.js"></script>
	<script src="js/jquery-ui.min.js"></script>
	<link rel="stylesheet" href="src/leaflet.css" />
	<link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css">
	<link rel="stylesheet" type="text/css" href="css/jquery-ui.theme.css">
	<link rel="stylesheet" type="text/css" href="css/jquery-ui.structure.css">
	<link rel="stylesheet" href="css/leaflet-measure.css">
	<link rel="stylesheet" type="text/css" href="dss.css">
	<link rel="stylesheet" href="src/leaflet.draw.css"/>
	<link rel="stylesheet" href="css/leaflet.zoomdisplay.css"/>
	<link rel="stylesheet" href="css/L.Control.Locate.min.css"/>
	<script src="js/html2canvas.min.js"></script>
	<script src="js/jquery.plugin.html2canvas.js"></script>
	<style>
		<?php if($lang=='vn'){ ?>
		.language-version-en{
			display: none;
		}
		<?php } else { ?>
		.language-version-vn{
			display: none;
		}
		<?php } ?>
		<?php if ($fullScreen) { ?>
		#map-container {
			height: 100% !important;
		}
		<?php } ?>" 
	</style>
	<style type="text/css" media="print">
		@page {
			size: A4;
			margin: 0;
		}
		@media print {
			html, body {
				height: 210mm;
				width: 297mm;
			}
			#map{
				height: 100%;
			}
			@page {
				size: landscape
			}
		}
	</style>
</head>
<body>
	<div id='banner-top' class='nav-top' style="<?php if ($fullScreen) { echo 'display:none;'; } ?>" >
		<div id='banner-top-title' class='nav-top'>
			<h1><?php echo dictionary('Forestry Data Sharing System'); ?></h1>
		</div>
		<div id='banner-top-forest-title' class='nav-top forest-title'><h3></h3></div>
		<div id='admin-tools' class='nav-top'>
			<div id="lng-change"  class='nav-top'>
				<a id="lng-change-vi" <?php if($lang=='vn'){echo 'style="display:none;"';}; ?> class='lng-change' href="vn"><img src="images/vn.png"></a>
				<a id="lng-change-en" <?php if($lang=='en'){echo 'style="display:none;"';}; ?> class='lng-change' href="en"><img src="images/en.png"></a>
			</div>
		</div>
		<div id='map-tools' class='nav-top'>
			<button id='info-btn' class='tool-btn disabled' title="<?php echo dictionary('Information'); ?>"><img src='images/circle.png'></button>
			<button id='measure-btn' class='tool-btn' title="<?php echo dictionary('Measurement'); ?>"><img src='images/m1.png'></button>
			<button id='print-btn' class='tool-btn' title="<?php echo dictionary('Export map to PNG'); ?>"><img src='images/print.png'></button>
		</div>
	</div>
	
	<nav  style="<?php if ($fullScreen) { echo 'display:none;'; } ?>" >
		<div id="nav">
			<input type="radio" id="radio1" class='menu-radio' name="radio"><label class='menu-btn' for="radio1"><?php echo dictionary('THEMATIC MAPS'); ?></label>
			<input type="radio" id="radio2" class='menu-radio' name="radio"><label class='menu-btn' for="radio2"><?php echo dictionary('REFERENCE DATA'); ?></label>
			<input type="radio" id="radio7" class='menu-radio' name="radio"><label class='menu-btn' for="radio7"><?php echo dictionary('SEARCH'); ?></label>
			<input type="radio" id="radio3" class='menu-radio' name="radio"><label class='menu-btn' for="radio3"><?php echo dictionary('STATISTICS'); ?></label>
			<input type="radio" id="radio4" class='menu-radio' name="radio"><label class='menu-btn' for="radio4"><?php echo dictionary('DATA CATALOGUE'); ?></label>
			<input type="radio" id="radio5" class='menu-radio' name="radio"><label class='menu-btn' for="radio5"><?php echo dictionary('HELP'); ?></label>
		</div>
	</nav>
	
	<div id="dialog-details" style="display:none">
		<button id='dialog-details-close'>X</button>
		<div id='tabs-details'>
			<ul>
				<li><a href="#tabs-details-1"><?php echo dictionary('Map layers'); ?></a></li>
				<li><a href="#tabs-details-2"><?php echo dictionary('Map legend'); ?></a></li>
				<li><a href="#tabs-details-3"><?php echo dictionary('Info'); ?></a></li>
			</ul>
			<div id="tabs-details-1"></div>
			<div id="tabs-details-2">
				<div id='legend-title' class='forest-title'><h3></h3></div>
				<div id='legend-container'>
					<div id='slider-cont'>
						<div><h4><?php echo dictionary('Adjust opacity'); ?></h4></div>
						<div id='slider'></div>
					</div>
					<p>
						<img id='legend' src=''>
					</p>
				</div>
			</div>
			<div id="tabs-details-3">
				<p id='info-no-data' style='display:none;'><?php echo dictionary('No data'); ?></p>
				<div id='info-container'></div>
			</div>
		</div>
	</div>
	
	<div id="dialog-forest-layers" class="dialog-menu" style="display:none">	
		<div id="forest-layers"></div> 
	</div>
	
	<div id="dialog-base-layers" class="dialog-menu" style="display:none">
		<ul id='reference-layers' class='menu-layers'></ul>
	</div>
	
	<div id="dialog-reference-layers" style="display:none">
		
	</div>
	
	<div id="dialog-report" class="dialog-menu" style="display:none">
		<div id="tabs-report">
			<div id="tabs-report-0">
				<p><b><?php echo dictionary('Statistics about forest resources'); ?></b></p>
				
				<p>
				<label class='select-label' for="radius"><?php echo dictionary('Select area for statistics'); ?></label>
				<select class='tab-select' name="radius" id="quick-stat-source">
					<option value="0">- <?php echo dictionary('Select source'); ?> -</option>
					<option value='pl'><?php echo dictionary('Select plots'); ?></option>
					<option value='un'><?php echo dictionary('Select administrative unit'); ?></option>
				</select>
				</p>
				
				<p id='quick-stat-select' style='display:none'>
					<label class='select-label' for="radius"><?php echo dictionary('Select plots'); ?></label>
					<button id='quick-stat-select-by-point' class='tool-btn select-btn' title="<?php echo dictionary('Select by point'); ?>"><img src='images/pin.png'></button><button id='quick-stat-select-by-polygon' class='tool-btn select-btn' title="<?php echo dictionary('Select by polygon'); ?>"><img src='images/hexagon.png'></button>
				</p>
				
				<p id='quick-stat-adm-uni' style='display:none'>
					<label class='select-label' for="radius"><?php echo dictionary('Administrative unit'); ?></label>
					<select class='tab-select select-adm-uni' name="radius" id='quick-stat-select-adm-uni'>
						<option value="0">- <?php echo dictionary('Select source'); ?> -</option>
						<option value='vn'><?php echo dictionary('Vietnam'); ?></option>
						<option value='pr'><?php echo dictionary('Province'); ?></option>
						<option value='di'><?php echo dictionary('District'); ?></option>
						<option value='co'><?php echo dictionary('Commune'); ?></option>
					</select>
				</p>
				
				<p id='quick-stat-region-province' class='quick-stat-region'>
					<label class='select-label' for="radius"><?php echo dictionary('Province'); ?></label>
					<select class='tab-select province-data' name="radius" id="quick-stat-province">
					  <option value=0>- <?php echo dictionary('Select province'); ?> -</option>
					</select>
				</p>
				
				<p id='quick-stat-region-district' class='quick-stat-region'>
					<label class='select-label' for="color"><?php echo dictionary('District'); ?></label>
					<select class='tab-select district-data' name="color" id="quick-stat-district">
					  <option value=0>- <?php echo dictionary('Select district'); ?> -</option>
					</select>
				</p>
				
				<p id='quick-stat-region-commune' class='quick-stat-region'>
					<label class='select-label' for="color"><?php echo dictionary('Commune'); ?></label>
					<select class='tab-select commune-data' name="color" id="quick-stat-commune">
					  <option value=0>- <?php echo dictionary('Select commune'); ?> -</option>
					</select>
				</p>
				
				<div id='quick-stat-region-loader' class='quick-stat-region' style='display:none;'><img src='images/load2.gif'></div>
				
				<p>
					<label class='select-label' for="data-set"><?php echo dictionary('Select data set'); ?></label>
					<select class='' name="data-set" id="quick-stat-data-set">
					</select>
				</p>
				
				<p>
					<label class='select-label' for="type"><?php echo dictionary('Select attribute'); ?></label>
					<select class='' name="type" id="quick-stat-type"></select>
				</p>
				
				<div id='quick-stat-dates' style='display:none;'>
					<p class='tab-select-date'>
					<input class='quick-stat-date' name="date1" id="quick-stat-date1">
					</p>
					<p class='tab-select-date'> - </p>
					<p class='tab-select-date'>
					<input class='quick-stat-date' name="date2" id="quick-stat-date2">
					</p>
				</div>
				
				<p id='quick-stat-error' style='display:none;'><?php echo dictionary('Error! Please try again.'); ?></p>
				
				<div id='view-report-btn'>
					<div id='quick-report-loader' class='btn-3' style='display:none;'><img src='images/load2.gif'></div>
					<button id='view-quick-report' class='btn-3 tab-button'><?php echo dictionary('View report'); ?></button>
					<button id='cancel-quick-report' onclick='$( "#dialog-report" ).dialog("close");$("#radio input").removeAttr("checked");$( "#radio" ).buttonset("refresh");' class='btn-3 tab-button'><?php echo dictionary('Cancel'); ?></button>
					<a class='btn-3' target='_blank' href='help/<?php echo $lang; ?>#5'><button id='help-report' class='tab-button'><?php echo dictionary('Help'); ?></button></a>
				</div>
			</div>
		</div>
	</div>
	
	<div id="dialog-signin" title="<?php echo dictionary('Sign in'); ?>" style="display:none">
		<p>
		<label class='select-label'><?php echo dictionary('Username'); ?></label>
		<input id='form-username'></input>
		</p>
		<p>
		<label class='select-label'><?php echo dictionary('Password'); ?></label>
		<input type='password'></input>
		</p>
		<button id='sign-in-btn' class='tab-button'><?php echo dictionary('Sign in'); ?></button>
	</div>
	
	<div id="dialog-search" class="dialog-menu" style="display:none">
		<div id="tabs-search">
			<ul style='display:none'>
				<li><a href="#tabs-1"><?php echo dictionary('By plot area'); ?></a></li>
				<li><a href="#tabs-2"><?php echo dictionary('By plot owner'); ?></a></li>
			</ul> 
			<div id="tabs-1">
				<p id='search-lvl-province'>
				<label class='select-label' for="radius"><?php echo dictionary('Province'); ?></label>
				<select class='tab-select province-data' name="radius" id="search-province">
				  <option value="0">- <?php echo dictionary('Select province'); ?> -</option>
				</select>
				</p>
				
				<p id='search-lvl-district' class = 'search-lvl-province' style='display:none;'>
				<label class='select-label' for="color"><?php echo dictionary('District'); ?></label>
				<select class='tab-select district-data' name="color" id="search-district">
				  <option value="0">- <?php echo dictionary('Select district'); ?> -</option>
				</select>
				</p>
				
				<p id='search-lvl-commune' class = 'search-lvl-province search-lvl-district' style='display:none;'>
				<label class='select-label' for="color"><?php echo dictionary('Commune'); ?></label>
				<select class='tab-select commune-data' name="color" id="search-commune">
				  <option value="0">- <?php echo dictionary('Select commune'); ?> -</option>
				</select>
				</p>
				
				<p id='search-lvl-compartment' class = 'search-lvl-province search-lvl-district search-lvl-commune' style='display:none;'>
				<label class='select-label' for="color"><?php echo dictionary('Compartment'); ?></label>
				<select class='tab-select' name="color" id="search-compartment">
				  <option value="0">- <?php echo dictionary('Select compartment'); ?> -</option>
				</select>
				</p>
				
				<p id='search-lvl-subcompartment' class = 'search-lvl-province search-lvl-district search-lvl-commune search-lvl-compartment' style='display:none;'>
				<label class='select-label' for="color"><?php echo dictionary('Sub-compartment'); ?></label>
				<select class='tab-select' name="color" id="search-subcompartment">
				  <option value="0">- <?php echo dictionary('Select sub-compartment'); ?> -</option>
				</select>
				</p>
				
				<p id='search-lvl-plot' class = 'search-lvl-province search-lvl-district search-lvl-commune search-lvl-compartment search-lvl-subcompartment' style='display:none;'>
				<label class='select-label' for="color"><?php echo dictionary('Plot'); ?></label>
				<select class='tab-select' name="color" id="search-plot">
				  <option value="0">- <?php echo dictionary('Select plot'); ?> -</option>
				</select>
				</p>
				<div id='search-lvl-loader' style='display:none;'><img src='images/load2.gif'></div>
				<div id='data-sharing-btn'>
					<button id='search-btn' class='btn-3 tab-button'><?php echo dictionary('Search'); ?></button>
					<button id='cancel-search' onclick='$( "#dialog-search" ).dialog("close");$("#radio input").removeAttr("checked");$( "#radio" ).buttonset("refresh");' class='btn-3 tab-button'><?php echo dictionary('Cancel'); ?></button>
					<a class='btn-3' target='_blank' href='help/<?php echo $lang; ?>#4'><button id='help-search' class='tab-button'><?php echo dictionary('Help'); ?></button></a>
				</div>
			</div>
			<div id="tabs-2">
				<p>
				<label class='select-label' for="radius"><?php echo dictionary('Province'); ?></label>
				<select class='tab-select province-data' name="radius" id="province">
				  <option value="0">- <?php echo dictionary('Select province'); ?> -</option>
				</select>
				</p>
				
				<p>
				<label class='select-label' for="color"><?php echo dictionary('District'); ?></label>
				<select class='tab-select' name="color" id="district">
				  <option value="0">- <?php echo dictionary('Select district'); ?> -</option>
				</select>
				</p>
				
				<p>
				<label class='select-label' for="color"><?php echo dictionary('Commune'); ?></label>
				<select class='tab-select' name="color" id="district">
				  <option value="0">- <?php echo dictionary('Select commune'); ?> -</option>
				</select>
				</p>
				
				<p>
				<label class='select-label' for="color"><?php echo dictionary('Forest owner'); ?></label>
				<select class='tab-select' name="color" id="owner">
				  <option value="0">- <?php echo dictionary('Select owner'); ?> -</option>
				</select>
				</p>
				
				<button id='fos-search' class='tab-button'><?php echo dictionary('Search'); ?></button>
			</div>
		</div>
	</div>
	
	<div id='map-container'>
		<div id="map">
			<title></title>
			<div id="leaflet-layer-no-data" class="language-version-<?php echo $lang; ?>" style='display:none;'><?php echo dictionary('Forest resource data is not available in this scale'); ?></div>
			<div id="map-move-undo" class="leaflet-control-layers leaflet-control" style="display:none;">
				<a class="leaflet-control-layers-toggle" href="#" title="<?php echo dictionary('Undo'); ?>" ></a>
			</div>
			<div id="map-move-redo" class="leaflet-control-layers leaflet-control" style="display:none;">
				<a class="leaflet-control-layers-toggle" href="#" title="<?php echo dictionary('Redo'); ?>" ></a>
			</div>
		 
			<button id='dialog-details-open' style='display:none;'>></button>
			
			<div id="measure-widget" class='widget'>
				<button id='measure-angle' class='tool-btn measure-btn' title="<?php echo dictionary('XY coordinates'); ?>"><img src='images/pin.png'></button><button id='measure-distance' class='tool-btn measure-btn' title="<?php echo dictionary('Measure distance'); ?>"><img src='images/l2.png'></button><button id='measure-area' class='tool-btn measure-btn' title="<?php echo dictionary('Measure area'); ?>"><img src='images/a4.png'></button>
				<div>
				<select name="unit" id="unit">
				  <option value="0">- <?php echo dictionary('Select unit'); ?> -</option>
				</select>
				</div>
			</div>
			<span id="measure-tooltip"></span>
			
			<div id="select-widget" class='widget'>
				<button id='select-by-point' class='tool-btn select-btn' title="<?php echo dictionary('Select by point'); ?>"><img src='images/pin.png'></button><button id='select-by-polygon' class='tool-btn select-btn' title="<?php echo dictionary('Select by polygon'); ?>"><img src='images/hexagon.png'></button>
			</div>
			
		</div>
		<div id='map-container-print'>
			<button id='map-container-print-btn'>PRINT</button>
			<button id='map-container-goback-btn'>GO BACK</button>
		</div>
	</div>
	
	<div id="dialog-quick-statistics" title="<?php echo dictionary('Quick statistics'); ?>" style="display:none">
		<div class='dialog-quick-statistics-column'>
			<div id="canvas-holder" style="width:100%">
			</div>
			<div id='dialog-quick-statistics-summary'>
				<div id='dialog-quick-statistics-summary-area'><label><?php echo dictionary('Total area:'); ?></label><span></span></div>
				<div id='dialog-quick-statistics-summary-plots'><label><?php echo dictionary('Total number of plots:'); ?></label><span></span></div>
				<div id='dialog-quick-statistics-summary-timber'><label><?php echo dictionary('Total volume:'); ?></label><span></span></div>
			</div>
		</div>
		<div class='dialog-quick-statistics-column'>
			<table id='dialog-quick-statistics-table'></table>
		</div>
	</div>
	
	<script src="src/leaflet.js"></script>
	
	<script src="src/Leaflet.draw.js"></script>
	<script src="src/Leaflet.Draw.Event.js"></script>

	<script src="src/edit/handler/Edit.Poly.js"></script>
	<script src="src/edit/handler/Edit.SimpleShape.js"></script>
	<script src="src/edit/handler/Edit.Circle.js"></script>
	<script src="src/edit/handler/Edit.Rectangle.js"></script>
	<script src="src/edit/handler/Edit.Marker.js"></script>
	
	<script src="src/draw/handler/Draw.Feature.js"></script>
	<script src="src/draw/handler/Draw.Polyline.js"></script>
	<script src="src/draw/handler/Draw.Polygon.js"></script>
	<script src="src/draw/handler/Draw.SimpleShape.js"></script>
	<script src="src/draw/handler/Draw.Rectangle.js"></script>
	<script src="src/draw/handler/Draw.Circle.js"></script>
	<script src="src/draw/handler/Draw.Marker.js"></script>

	<script src="src/ext/TouchEvents.js"></script>
	<script src="src/ext/LatLngUtil.js"></script>
	<script src="src/ext/GeometryUtil.js"></script>
	<script src="src/ext/LineUtil.Intersect.js"></script>
	<script src="src/ext/Polyline.Intersect.js"></script>
	<script src="src/ext/Polygon.Intersect.js"></script>

	<script src="src/Control.Draw.js"></script>
	<script src="src/Tooltip.js"></script>
	<script src="src/Toolbar.js"></script>

	<script src="src/draw/DrawToolbar.js"></script>
	<script src="src/edit/EditToolbar.js"></script>
	<script src="src/edit/handler/EditToolbar.Edit.js"></script>
	<script src="src/edit/handler/EditToolbar.Delete.js"></script>
	
	<script src="js/proj4.js"></script>
	<script src="js/proj4leaflet.js"></script>
	<script src="js/jQuery.print.js"></script>
	<script src="js/leaflet-measure.js"></script>
	<script src="js/leaflet.zoomdisplay.js"></script>
	<script src="lists.js"></script>
	<script src="js/wicket.js"></script>
	<script src="js/wicket-leaflet.js"></script>
	<script src="js/leaflet-fullHash.js"></script>
	<script src="js/L.Control.Locate.min.js"></script>
	<script src="js/jquery.canvasjs.min.js"></script>
	<script src="js/Chart.bundle.min.js"></script>
	<script src="dss.js"></script>
</body>
</html>