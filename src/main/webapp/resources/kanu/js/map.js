////////////////////////////////  지 도 시 작 ///////////////////////////////////////////////////////////////

	var latLngArray = {};
    //var imgSrc = "../kanu/images/custom_marker.png",
	//var imgSrc = "../kanu/images/animat-search-color.gif",
	//var imgSrc = "../kanu/images/markerO.gif",
	var imgSrc = "../kanu/images/animat-diamond-color.gif",
		imageSize = new daum.maps.Size(70, 70),
		imageOption = {offset: new daum.maps.Point(35, 35)};
	
	var customMarkerImage = new daum.maps.MarkerImage(imgSrc, imageSize, imageOption);

	var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
	    mapOption = { 
	        center: new daum.maps.LatLng(37.570707, 126.984611), // 지도의 중심좌표
	        level: 8, // 지도의 확대 레벨
	        maxLevel: 12
	    };

	var map = new daum.maps.Map(mapContainer, mapOption),
	    customOverlay = new daum.maps.CustomOverlay({}),
	    infowindow = new daum.maps.InfoWindow({removable: true});
	
	 var clusterer = new daum.maps.MarkerClusterer({
	        map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체 
	        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정 
	        minLevel: 1, // 클러스터 할 최소 지도 레벨 
	        gridSize: 180, //클러스터의 격자 크기
	        minClusterSize : 1,
	        calculator: [10, 100, 1000], 
	        styles: [{ // calculator 각 사이 값 마다 적용될 스타일을 지정한다
			        width : '70px', height : '70px',
			        background: 'rgba(51, 204, 255, .8)',
			        borderRadius: '35px',
			        color: '#000',
			        textAlign: 'center',
			        fontSize: '35px',
			        fontWeight: 'bold',
			        lineHeight: '71px'
			    },
			    {
			        width : '78px', height : '78px',
			        background: 'rgba(255, 153, 0, .8)',
			        borderRadius: '39px',
			        color: '#000',
			        textAlign: 'center',
			        fontSize: '38px',
			        fontWeight: 'bold',
			        lineHeight: '79px'
			    },
			    {
			        width : '90px', height : '90px',
			        background: 'rgba(255, 51, 204, .8)',
			        borderRadius: '45px',
			        color: '#000',
			        textAlign: 'center',
			        fontSize: '40px',
			        fontWeight: 'bold',
			        lineHeight: '91px'
			    },
			    {
			        width : '110px', height : '110px',
			        background: 'rgba(255, 80, 80, .8)',
			        borderRadius: '55px',
			        color: '#000',
			        textAlign: 'center',
			        fontSize: '45px',
			        fontWeight: 'bold',
			        lineHeight: '111px'
			        }
			    ]
			});

	
   //////////지도 정보 가져오기 ///////////////////// 
	var center = map.getCenter();
	var level = map.getLevel();
	var bounds = map.getBounds();
	var swLatLng = bounds.getSouthWest();
	$("#swLatLng").val(swLatLng);
    $("#west").val(swLatLng.getLng());
    $("#south").val(swLatLng.getLat());

	var neLatLng = bounds.getNorthEast();
	$("#neLatLng").val(neLatLng);
    $("#east").val(neLatLng.getLng());
    $("#north").val(neLatLng.getLat());

	var size = 80;
$('document').ready(function(){	
    $(document).ajaxSend(function(e, xhr, options) {
    	console.log("ajaxSend 인입");
        xhr.setRequestHeader(header, token);

    });
    
 
	
	 $("#map").mouseup(function(){
	   //console.log("인포인입");
	    // 지도의 현재 중심좌표를 얻어옵니다 
	    center = map.getCenter(); 
	    $("#center").val(center);
	    
	    // 지도의 현재 레벨을 얻어옵니다
	    level = map.getLevel();
	    $("#level").val(level);
	    
	    // 지도타입을 얻어옵니다
	    var mapTypeId = map.getMapTypeId(); 
	    
	    // 지도의 현재 영역을 얻어옵니다 
	    bounds = map.getBounds();
	    $("#bounds").val(bounds);
	   
	    // 영역의 남서쪽 좌표를 얻어옵니다 
	    swLatLng = bounds.getSouthWest(); 
	    $("#swLatLng").val(swLatLng);
	    $("#west").val(swLatLng.getLng());
	    $("#south").val(swLatLng.getLat());
	    // 영역의 북동쪽 좌표를 얻어옵니다 
	    neLatLng = bounds.getNorthEast(); 
	    $("#neLatLng").val(neLatLng);
	    $("#east").val(neLatLng.getLng());
	    $("#north").val(neLatLng.getLat());
	    // 영역정보를 문자열로 얻어옵니다. ((남,서), (북,동)) 형식입니다
	    var boundsStr = bounds.toString();
	    
	    
	    var message = '지도 중심좌표는 위도 ' + center.getLat() + ', <br>';
	    message += '경도 ' + center.getLng() + ' 이고 <br>';
	    message += '지도 레벨은 ' + level + ' 입니다 <br> <br>';
	    message += '지도 타입은 ' + mapTypeId + ' 이고 <br> ';
	    message += '지도의 남서쪽 좌표는 ' + swLatLng.getLat() + ', ' + swLatLng.getLng() + ' 이고 <br>';
	    message += '지도의 현재 역역은 '+bounds+' 입니다<br>';
	    message += '북동쪽 좌표는 ' + neLatLng.getLat() + ', ' + neLatLng.getLng() + ' 입니다';
	    
	    console.log(message);
	    console.log("listCount: "+$("#total").val()+",listCnt: "+$("#listCnt").val()+",pageCnt: "+$("#pageCnt").val());
	    pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	    
	});
	 
	 //클러스터러 생성
	 $('document').ready(mkClusterer());
	 
	 //돋보기 버튼 클릭시 지도 센터로 오게
	 $("#search_button").click( function(){
		 $.ajax({
			 url : "areaSearch.do",
			 type : "POST",
			 data : {address : $("#address_search").val()},
			 success : function(responseData){
				 var data = responseData;
				 console.log("돋보기버튼 lat: "+data.lat+"돋보기버튼 lng: "+data.lng);
				 map.setCenter(new daum.maps.LatLng(data.lat, data.lng));
				 map.setLevel(12);
				 setTimeout( function() { pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());  }, 500);
				 map.setLevel(8);
			 }
		 });
	 });
	 
	 $("#address_search").keypress(function(event){
		 console.log("검색어 쓰고 엔터 인입");
		 if(event.which == 13){
			 $.ajax({
				 url : "areaSearch.do",
				 type : "POST",
				 data : {address : $("#address_search").val()},
				 success : function(responseData){
					 var data = responseData;
					 console.log("돋보기버튼 lat: "+data.lat+"돋보기버튼 lng: "+data.lng);
					 map.setCenter(new daum.maps.LatLng(data.lat, data.lng));
					 map.setLevel(12);
					 setTimeout( function() { pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());  }, 500);
					 map.setLevel(8);
				 }
			 });

		 }
	 });
	 
	 
	 function mkClusterer(){
		 latLngArray["north"] = $("#north").val();
		 latLngArray["south"] = $("#south").val();
		 latLngArray["east"] = $("#east").val();
		 latLngArray["west"] = $("#west").val();
		 latLngArray["pageStartNum"] = $("#pageStartNum").val()*1;
		 latLngArray["index"] =	$("#index").val()*1;
		 latLngArray["address"]=$("#address_search").val;
		 var jsonLatLng = JSON.stringify(latLngArray);
		 $.ajax({
		 	contentType : "application/json",
	    	url : "mapClusterer.do",
	    	type : "post",
	    	dataType : "json",
	    	data : jsonLatLng,
		 	success : function(responseData){
			    var position = responseData;
		        var markers = $(position.positions).map(function(i, position) {
		            return new daum.maps.Marker({
		                position : new daum.maps.LatLng(position.lat, position.lng)         	
		            });
		        });
		        // 클러스터러에 마커들을 추가합니다
	        	clusterer.clear();
		        clusterer.addMarkers(markers);
			},error:function(request,status,error){
		        alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
	       }
		 });
	 }
    // 마커 클러스터러를 생성합니다 
   
    var count = 1;
    //마우스 스크롤 조정했을때 이벤트 처리
    daum.maps.event.addListener(map, 'zoom_changed', function() {
    	level = map.getLevel();
    	console.log('zoom changed!:'+level+"clustererGridSize: "+clusterer.getGridSize());
   		zoomOver();

//      if(level == 12)clusterer.setGridSize(120);
//      else if(level <= 10)clusterer.setGridSize(180);

//      console.log('zoom changed!:'+level+"clustererGridSize: "+clusterer.getGridSize());
    });
    
    function zoomOver(){
    	console.log("zoomOver인입");
    	center = map.getCenter(); 
	    $("#center").val(center);
	    
	    // 지도의 현재 레벨을 얻어옵니다
	    level = map.getLevel();
	    $("#level").val(level);
	    
	    // 지도의 현재 영역을 얻어옵니다 
	    bounds = map.getBounds();
	    $("#bounds").val(bounds);
	   
	    // 영역의 남서쪽 좌표를 얻어옵니다 
	    swLatLng = bounds.getSouthWest(); 
	    $("#swLatLng").val(swLatLng);
	    $("#west").val(swLatLng.getLng());
	    $("#south").val(swLatLng.getLat());
	    // 영역의 북동쪽 좌표를 얻어옵니다 
	    neLatLng = bounds.getNorthEast(); 
	    $("#neLatLng").val(neLatLng);
	    $("#east").val(neLatLng.getLng());
	    $("#north").val(neLatLng.getLat());
	    /////////////////////////////////////////

	    // 영역의 남서쪽 좌표를 얻어옵니다 
	    swLatLng = bounds.getSouthWest(); 
	    $("#swLatLng").val(swLatLng);
	    $("#west").val(swLatLng.getLng());
	    $("#south").val(swLatLng.getLat());
	    // 영역의 북동쪽 좌표를 얻어옵니다 
	    neLatLng = bounds.getNorthEast(); 
	    $("#neLatLng").val(neLatLng);
	    $("#east").val(neLatLng.getLng());
	    $("#north").val(neLatLng.getLat());
	    pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	    
    	
	   
    }


    
    //클러스터를 클릭 했을때 이벤트 처리
    daum.maps.event.addListener( clusterer, 'clusterclick', function( cluster ) {
    	rectangle.setOptions({fillColor: 'rgba(0,0,0,0)'});
    	rectangle.setOptions({strokeColor: 'rgba(0,0,0,0)'});
        
    	var west = cluster.getBounds().da;
    	$("#west").val(west);
    	var south = cluster.getBounds().ka;
    	$("#south").val(south);
    	var east = cluster.getBounds().ia;
    	$("#east").val(east);
    	var north = cluster.getBounds().ja;
    	$("#north").val(north);
    	//console.log("클러스터러 영역:"+west+", "+south+", "+east+", "+north );
    	pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val()); 
   });
    
    var rectangle;
    var west = 0.0;
	var south = 0.0; 
	var east = 0.0;
	var north = 0.0;
	/// 클러스터 마우스 오버 이벤트 핸들러
    daum.maps.event.addListener( clusterer, 'clusterover', function( cluster ) {
    	west = cluster.getBounds().da;
    	south = cluster.getBounds().ka;
    	east = cluster.getBounds().ia;
    	north = cluster.getBounds().ja;
    	console.log("마우스오버이벤트 동서남북 좌표 west:"+west+", south: "+south+", east: "+east+", north: "+north);
    	
    	var sw = new daum.maps.LatLng(south, west), // 사각형 영역의 남서쪽 좌표
        ne = new daum.maps.LatLng(north, east); // 사각형 영역의 북동쪽 좌표
    	var rectangleBounds = new daum.maps.LatLngBounds(sw, ne);
    	rectangle = new daum.maps.Rectangle({
    	    bounds: rectangleBounds, // 그려질 사각형의 영역정보입니다
    	    strokeWeight: 4, // 선의 두께입니다
    	    strokeColor: '#FF3DE5', // 선의 색깔입니다
    	    strokeOpacity: 0.1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
    	    strokeStyle: 'shortdashdot', // 선의 스타일입니다
    	    fillColor: '#09f', // 채우기 색깔입니다
    	    fillOpacity: 0.4 // 채우기 불투명도 입니다
    	});
    	if (level < 8) rectangle.setMap(map);
    	

 	    // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
 	    // 커스텀 오버레이를 지도에서 제거합니다 
 	    daum.maps.event.addListener(rectangle, 'mouseout', function() {
 	    	rectangle.setOptions({fillColor: 'rgba(0,0,0,0)'});
 	    	rectangle.setOptions({strokeColor: 'rgba(0,0,0,0)'});
 	        customOverlay.setMap(null);
 	    }); 

 	    // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 다각형의 이름과 면적을 인포윈도우에 표시합니다 
// 	    daum.maps.event.addListener(rectangle, 'click', function(mouseEvent) {
// 	        var content = '<div class="info">' + 
// 	                    '   <div class="title">' + level + '</div>' +
// 	                    '   <div class="size">총 면적 : 약 ' + Math.floor(rectangle.getArea()) + ' m<sup>2</sup></area>' +
// 	                    '</div>';
//
// 	        infowindow.setContent(content); 
// 	        infowindow.setPosition(mouseEvent.latLng); 
// 	        infowindow.setMap(map);
// 	    });
   
    });

    
 // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new daum.maps.services.Geocoder();
 
 // 주소로 좌표를 검색합니다
 		$("#serch_now").click(function(){
 			var addr = $("#search_addr").val();
	 		 geocoder.addressSearch(addr, function(result, status) {
	
	 	        // 정상적으로 검색이 완료됐으면 
	 	         if (status === daum.maps.services.Status.OK) {
	
	 	            var coords = new daum.maps.LatLng(result[0].y, result[0].x);
	
	 	            // 결과값으로 받은 위치를 마커로 표시합니다
	 	            var marker = new daum.maps.Marker({
	 	                map: map,
	 	                position: coords
	 	            });
	 	           clusterer.addMarker(marker); //매물 등록시 하나씩 입력받은 값을 좌표로 변경하여 클러스터에 추가함
	 		 	           
	 	           $.ajax({
	 	        	   url : "join.do",
	 	        	   type : "post",
	 	        	   data : {latLng : coords}
	 	           });
	
// 	 	            // 인포윈도우로 장소에 대한 설명을 표시합니다
// 	 	            var infowindow = new daum.maps.InfoWindow({
// 	 	                content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
// 	 	            });
// 	 	            infowindow.open(map, marker);
	
	 	            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
	 	            map.setCenter(coords);
	 	        } 
	 	    });    
 		});

 

 	/////////////////////////////////////////////// 지 도 끝 /////////////////////////////////////////////////////////////////////////////
 	//begin_text & end_text click event 
 	$("#begin_text, #end_text").click(function(){
 		if(isNaN($("#end_text").val())) {
 	 		$("#end_text").val(99999);
 	 	}
 	 	if(isNaN($("#begin_text").val())) {
 	 		$("#begin_text").val(0);
 	 	}
 		var begin = $("#begin_text").val();
 		var end = $("#end_text").val();
 	 	$("#deposit").empty().append("(보)"+begin+"만 ~ "+end+"만");
 	});	
 	
 	//보증금 드랍다운 메뉴 클릭
 	$("#deposit").click(function(){
 		var begin = $("#begin_text").val();
 		var end = $("#end_text").val();
 	 	$("#deposit").empty().append("(보)"+begin+"만 ~ "+end+"만");
 		if(isNaN(end)) {
 	 		$("#end_text").val(99999);
 	 		$("#deposit").empty().append("(보)"+begin+"만 ~ "+end+"만");
 	 	}
 	 	if(isNaN(begin)) {
 	 		$("#begin_text").val(0);
 	 		$("#deposit").empty().append("(보)"+begin+"만 ~ "+end+"만");
 	 	}
 	 	
  	});	
 		
	// 보증금 검색 0원 부터
	$("#begin_0").click(function(){
		if($("#begin_0").attr('class').includes("disabled")){
			return;
		}
		$("#begin_text").val(0);
		$("#begin_0").css("background-color", "#3B8DE0");
		$("#begin_500 , #begin_1000 , #begin_2000 , #begin_3000 , #begin_4000 , #begin_5000 , #begin_6000 , #begin_7000 , #begin_8000 , #begin_9000 , #begin_10000 , #begin_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#end_0, #end_500, #end_1000, #end_2000, #end_3000, #end_4000, #end_5000, #end_6000, #end_7000, #end_8000, #end_9000, #end_10000, #end_unlimited").removeClass("disabled");
		$("#deposit").empty().append("(보)"+$("#begin_text").val()+"만 ~ "+$("#end_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#begin_500").click(function(){
		if($("#begin_500").attr('class').includes("disabled")){
			return;
		}
		$("#begin_text").val(500);
		$("#begin_500").css("background-color", "#3B8DE0");
		$("#begin_0 , #begin_1000 , #begin_2000 , #begin_3000 , #begin_4000 , #begin_5000 , #begin_6000 , #begin_7000 , #begin_8000 , #begin_9000 , #begin_10000 , #begin_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#end_0").addClass("disabled");
		$("#end_500, #end_1000, #end_2000, #end_3000, #end_4000, #end_5000, #end_6000, #end_7000, #end_8000, #end_9000, #end_10000, #end_unlimited").removeClass("disabled");
		console.log("보증금시작 500만원 선택1");
		if($("#end_text").val()*1 < 500 || $("#end_text").val() === ""){
			$("#end_text").val(500); 
		}
		$("#deposit").empty().append("(보)"+$("#begin_text").val()+"만 ~ "+$("#end_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#begin_1000").click(function(){
		if($("#begin_1000").attr('class').includes("disabled")){
			return;
		}
		$("#begin_text").val(1000);
		$("#begin_1000").css("background-color", "#3B8DE0");
		$("#begin_0 , #begin_500 , #begin_2000 , #begin_3000 , #begin_4000 , #begin_5000 , #begin_6000 , #begin_7000 , #begin_8000 , #begin_9000 , #begin_10000 , #begin_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#end_0, #end_500").addClass("disabled");
		$("#end_1000, #end_2000, #end_3000, #end_4000, #end_5000, #end_6000, #end_7000, #end_8000, #end_9000, #end_10000, #end_unlimited").removeClass("disabled");
		if($("#end_text").val()*1 < 1000 || $("#end_text").val() === ""){
			$("#end_text").val(1000); 
		}
		$("#deposit").empty().append("(보)"+$("#begin_text").val()+"만 ~ "+$("#end_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#begin_2000").click(function(){
		if($("#begin_2000").attr('class').includes("disabled")){
			return;
		}
		$("#begin_text").val(2000);
		$("#begin_2000").css("background-color", "#3B8DE0");
		$("#begin_0 , #begin_500 , #begin_1000 , #begin_3000 , #begin_4000 , #begin_5000 , #begin_6000 , #begin_7000 , #begin_8000 , #begin_9000 , #begin_10000 , #begin_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#end_0, #end_500, #end_1000").addClass("disabled");
		$("#end_2000, #end_3000, #end_4000, #end_5000, #end_6000, #end_7000, #end_8000, #end_9000, #end_10000, #end_unlimited").removeClass("disabled");
		if($("#end_text").val()*1 < 2000 || $("#end_text").val() === ""){
			$("#end_text").val(2000); 
		}
		$("#deposit").empty().append("(보)"+$("#begin_text").val()+"만 ~ "+$("#end_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#begin_3000").click(function(){
		if($("#begin_3000").attr('class').includes("disabled")){
			return;
		}
		$("#begin_text").val(3000);
		$("#begin_3000").css("background-color", "#3B8DE0");
		$("#begin_0 , #begin_500 , #begin_1000 , #begin_2000 , #begin_4000 , #begin_5000 , #begin_6000 , #begin_7000 , #begin_8000 , #begin_9000 , #begin_10000 , #begin_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#end_0, #end_500, #end_1000, #end_2000").addClass("disabled");
		$("#end_3000, #end_4000, #end_5000, #end_6000, #end_7000, #end_8000, #end_9000, #end_10000, #end_unlimited").removeClass("disabled");
		if($("#end_text").val()*1 < 3000 || $("#end_text").val() === ""){
			$("#end_text").val(3000); 
		}
		$("#deposit").empty().append("(보)"+$("#begin_text").val()+"만 ~ "+$("#end_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#begin_4000").click(function(){
		if($("#begin_4000").attr('class').includes("disabled")){
			return;
		}
		$("#begin_text").val(4000);
		$("#begin_4000").css("background-color", "#3B8DE0");
		$("#begin_0 , #begin_500 , #begin_1000 , #begin_2000 , #begin_3000 , #begin_5000 , #begin_6000 , #begin_7000 , #begin_8000 , #begin_9000 , #begin_10000 , #begin_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#end_0, #end_500, #end_1000, #end_2000, #end_3000").addClass("disabled");
		$("#end_4000, #end_5000, #end_6000, #end_7000, #end_8000, #end_9000, #end_10000, #end_unlimited").removeClass("disabled");
		if($("#end_text").val()*1 < 4000 || $("#end_text").val() === ""){
			$("#end_text").val(4000); 
		}
		$("#deposit").empty().append("(보)"+$("#begin_text").val()+"만 ~ "+$("#end_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#begin_5000").click(function(){
		if($("#begin_5000").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#begin_text").val(5000);
		$("#begin_5000").css("background-color", "#3B8DE0");
		$("#begin_0 , #begin_500 , #begin_1000 , #begin_2000 , #begin_3000 , #begin_4000 , #begin_6000 , #begin_7000 , #begin_8000 , #begin_9000 , #begin_10000 , #begin_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#end_0, #end_500, #end_1000, #end_2000, #end_3000, #end_4000").addClass("disabled");
		$("#end_5000, #end_6000, #end_7000, #end_8000, #end_9000, #end_10000, #end_unlimited").removeClass("disabled");
		if($("#end_text").val()*1 < 5000 || $("#end_text").val() === ""){
			$("#end_text").val(5000); 
		}
		$("#deposit").empty().append("(보)"+$("#begin_text").val()+"만 ~ "+$("#end_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#begin_6000").click(function(){
		if($("#begin_6000").attr('class').includes("disabled")){
			return;
		}
		$("#begin_text").val(6000);
		$("#begin_6000").css("background-color", "#3B8DE0");
		$("#begin_0 , #begin_500 , #begin_1000 , #begin_2000 , #begin_3000 , #begin_4000 , #begin_5000 , #begin_7000 , #begin_8000 , #begin_9000 , #begin_10000 , #begin_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#end_0, #end_500, #end_1000, #end_2000, #end_3000, #end_4000, #end_5000").addClass("disabled");
		$("#end_6000, #end_7000, #end_8000, #end_9000, #end_10000, #end_unlimited").removeClass("disabled");
		if($("#end_text").val()*1 < 6000 || $("#end_text").val() === ""){
			$("#end_text").val(6000); 
		}
		$("#deposit").empty().append("(보)"+$("#begin_text").val()+"만 ~ "+$("#end_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#begin_7000").click(function(){
		if($("#begin_7000").attr('class').includes("disabled")){
			return;
		}
		$("#begin_text").val(7000);
		$("#begin_7000").css("background-color", "#3B8DE0");
		$("#begin_0 , #begin_500 , #begin_1000 , #begin_2000 , #begin_3000 , #begin_4000 , #begin_5000 , #begin_6000 , #begin_8000 , #begin_9000 , #begin_10000 , #begin_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#end_0, #end_500, #end_1000, #end_2000, #end_3000, #end_4000, #end_5000, #end_6000").addClass("disabled");
		$("#end_7000, #end_8000, #end_9000, #end_10000, #end_unlimited").removeClass("disabled");
		if($("#end_text").val()*1 < 7000 || $("#end_text").val() === ""){
			$("#end_text").val(7000); 
		}
		$("#deposit").empty().append("(보)"+$("#begin_text").val()+"만 ~ "+$("#end_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#begin_8000").click(function(){
		if($("#begin_8000").attr('class').includes("disabled")){
			return;
		}
		$("#begin_text").val(8000);
		$("#begin_8000").css("background-color", "#3B8DE0");
		$("#begin_0 , #begin_500 , #begin_1000 , #begin_2000 , #begin_3000 , #begin_4000 , #begin_5000 , #begin_6000 , #begin_7000 , #begin_9000 , #begin_10000 , #begin_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#end_0, #end_500, #end_1000, #end_2000, #end_3000, #end_4000, #end_5000, #end_6000, #end_7000").addClass("disabled");
		$("#end_8000, #end_9000, #end_10000, #end_unlimited").removeClass("disabled");
		if($("#end_text").val()*1 < 8000 || $("#end_text").val() === ""){
			$("#end_text").val(8000);
		}
		$("#deposit").empty().append("(보)"+$("#begin_text").val()+"만 ~ "+$("#end_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#begin_9000").click(function(){
		if($("#begin_9000").attr('class').includes("disabled")){
			return;
		}
		$("#begin_text").val(9000);
		$("#begin_9000").css("background-color", "#3B8DE0");
		$("#begin_0 , #begin_500 , #begin_1000 , #begin_2000 , #begin_3000 , #begin_4000 , #begin_5000 , #begin_6000 , #begin_7000 , #begin_8000 , #begin_10000 , #begin_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#end_0, #end_500, #end_1000, #end_2000, #end_3000, #end_4000, #end_5000, #end_6000, #end_7000, #end_8000").addClass("disabled");
		$("#end_9000, #end_10000, #end_unlimited").removeClass("disabled");
		if($("#end_text").val()*1 < 9000 || $("#end_text").val() === ""){
			$("#end_text").val(9000);
		}
		$("#deposit").empty().append("(보)"+$("#begin_text").val()+"만 ~ "+$("#end_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#begin_10000").click(function(){
		if($("#begin_10000").attr('class').includes("disabled")){
			return;
		}
		$("#begin_text").val(10000);
		$("#begin_10000").css("background-color", "#3B8DE0");
		$("#begin_0 , #begin_500 , #begin_1000 , #begin_2000 , #begin_3000 , #begin_4000 , #begin_5000 , #begin_6000 , #begin_7000 , #begin_8000 , #begin_9000 , #begin_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#end_0, #end_500, #end_1000, #end_2000, #end_3000, #end_4000, #end_5000, #end_6000, #end_7000, #end_8000, #end_9000").addClass("disabled");
		$("#end_10000, #end_unlimited").removeClass("disabled");
		if($("#end_text").val()*1 < 10000 || $("#end_text").val() === ""){
			$("#end_text").val(10000); 
		}
		$("#deposit").empty().append("(보)"+$("#begin_text").val()+"만 ~ "+$("#end_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#begin_unlimited").click(function(){
		if($("#begin_unlimited").attr('class').includes("disabled")){
			return;
		}
		$("#begin_text").val(99999);
		$("#begin_unlimited").css("background-color", "#3B8DE0");
		$("#begin_0 , #begin_500 , #begin_1000 , #begin_2000 , #begin_3000 , #begin_4000 , #begin_5000 , #begin_6000 , #begin_7000 , #begin_8000 , #begin_9000 , #begin_10000").css("background-color", "rgba(0,0,0,0)");
		$("#end_0, #end_500, #end_1000, #end_2000, #end_3000, #end_4000, #end_5000, #end_6000, #end_7000, #end_8000, #end_9000, #end_10000").addClass("disabled");
		$("#end_unlimited").removeClass("disabled");
		if($("#end_text").val()*1 != 99999 || $("#end_text").val() === ""){
			$("#end_text").val(99999); 
		}
		$("#deposit").empty().append("(보)"+$("#begin_text").val()+"만 ~ "+$("#end_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	// 보증금 0원 까지
	$("#end_0").click(function(){
		if($("#end_0").attr('class').includes("disabled")){
			return;
		}
		$("#end_text").val(0);
		$("#end_0").css("background-color", "#3B8DE0");
		$("#end_500 , #end_1000 , #end_2000 , #end_3000 , #end_4000 , #end_5000 , #end_6000 , #end_7000 , #end_8000 , #end_9000 , #end_10000 , #end_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#begin_0, #begin_500, #begin_1000, #begin_2000, #begin_3000, #begin_4000, #begin_5000, #begin_6000, #begin_7000, #begin_8000, #begin_9000, #begin_10000, #begin_unlimited").addClass("disabled");
		if($("#begin_text").val()*1 > 0 || $("#begin_text").val() === ""){
			$("#begin_text").val(0); 
		}
		$("#deposit").empty().append("(보)"+$("#begin_text").val()+"만 ~ "+$("#end_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#end_500").click(function(){
		if($("#end_500").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#end_text").val(500);
		$("#end_500").css("background-color", "#3B8DE0");
		$("#end_0 , #end_1000 , #end_2000 , #end_3000 , #end_4000 , #end_5000 , #end_6000 , #end_7000 , #end_8000 , #end_9000 , #end_10000 , #end_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#begin_0, #begin_500").removeClass("disabled");
		$("#begin_1000, #begin_2000, #begin_3000, #begin_4000, #begin_5000, #begin_6000, #begin_7000, #begin_8000, #begin_9000, #begin_10000, #begin_unlimited").addClass("disabled");
		if($("#begin_text").val()*1 > 500 || $("#begin_text").val() === ""){
			$("#begin_text").val(500); 
		}
		$("#deposit").empty().append("(보)"+$("#begin_text").val()+"만 ~ "+$("#end_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
		
	});
	
	$("#end_1000").click(function(){
		if($("#end_1000").attr('class').includes("disabled")){
			return;
		}
		$("#end_text").val(1000);
		$("#end_1000").css("background-color", "#3B8DE0");
		$("#end_0 , #end_500 , #end_2000 , #end_3000 , #end_4000 , #end_5000 , #end_6000 , #end_7000 , #end_8000 , #end_9000 , #end_10000 , #end_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#begin_0, #begin_500, #begin_1000").removeClass("disabled");
		$("#begin_2000, #begin_3000, #begin_4000, #begin_5000, #begin_6000, #begin_7000, #begin_8000, #begin_9000, #begin_10000, #begin_unlimited").addClass("disabled");
		if($("#begin_text").val()*1 > 1000 || $("#begin_text").val() === ""){
			$("#begin_text").val(1000); 
		}
		$("#deposit").empty().append("(보)"+$("#begin_text").val()+"만 ~ "+$("#end_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
		
	});
	
	$("#end_2000").click(function(){
		if($("#end_2000").attr('class').includes("disabled")){
			return;
		}
		$("#end_text").val(2000);
		$("#end_2000").css("background-color", "#3B8DE0");
		$("#end_0 , #end_500 , #end_1000 , #end_3000 , #end_4000 , #end_5000 , #end_6000 , #end_7000 , #end_8000 , #end_9000 , #end_10000 , #end_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#begin_0, #begin_500, #begin_1000, #begin_2000").removeClass("disabled");
		$("#begin_3000, #begin_4000, #begin_5000, #begin_6000, #begin_7000, #begin_8000, #begin_9000, #begin_10000, #begin_unlimited").addClass("disabled");
		if($("#begin_text").val()*1 > 2000 || $("#begin_text").val() === ""){
			$("#begin_text").val(2000); 
		}
		$("#deposit").empty().append("(보)"+$("#begin_text").val()+"만 ~ "+$("#end_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#end_3000").click(function(){
		if($("#end_3000").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#end_text").val(3000);
		$("#end_3000").css("background-color", "#3B8DE0");
		$("#end_0 , #end_500 , #end_1000 , #end_2000 , #end_4000 , #end_5000 , #end_6000 , #end_7000 , #end_8000 , #end_9000 , #end_10000 , #end_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#begin_0, #begin_500, #begin_1000, #begin_2000, #begin_3000").removeClass("disabled");
		$("#begin_4000, #begin_5000, #begin_6000, #begin_7000, #begin_8000, #begin_9000, #begin_10000, #begin_unlimited").addClass("disabled");
		if($("#begin_text").val()*1 > 3000 || $("#begin_text").val() === ""){
			$("#begin_text").val(3000); 
		}
		$("#deposit").empty().append("(보)"+$("#begin_text").val()+"만 ~ "+$("#end_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#end_4000").click(function(){
		if($("#end_4000").attr('class').includes("disabled")){
			return;
		}
		$("#end_text").val(4000);
		$("#end_4000").css("background-color", "#3B8DE0");
		$("#end_0 , #end_500 , #end_1000 , #end_2000 , #end_3000 , #end_5000 , #end_6000 , #end_7000 , #end_8000 , #end_9000 , #end_10000 , #end_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#begin_0, #begin_500, #begin_1000, #begin_2000, #begin_3000, #begin_4000").removeClass("disabled");
		$("#begin_5000, #begin_6000, #begin_7000, #begin_8000, #begin_9000, #begin_10000, #begin_unlimited").addClass("disabled");
		if($("#begin_text").val()*1 > 4000 || $("#begin_text").val() === ""){
			$("#begin_text").val(4000); 
		}
		$("#deposit").empty().append("(보)"+$("#begin_text").val()+"만 ~ "+$("#end_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#end_5000").click(function(){
		if($("#end_5000").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#end_text").val(5000);
		$("#end_5000").css("background-color", "#3B8DE0");
		$("#end_0 , #end_500 , #end_1000 , #end_2000 , #end_3000 , #end_4000 , #end_6000 , #end_7000 , #end_8000 , #end_9000 , #end_10000 , #end_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#begin_0, #begin_500, #begin_1000, #begin_2000, #begin_3000, #begin_4000, #begin_5000").removeClass("disabled");
		$("#begin_6000, #begin_7000, #begin_8000, #begin_9000, #begin_10000, #begin_unlimited").addClass("disabled");
		if($("#begin_text").val()*1 > 5000 || $("#begin_text").val() === ""){
			$("#begin_text").val(5000); 
		}
		$("#deposit").empty().append("(보)"+$("#begin_text").val()+"만 ~ "+$("#end_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#end_6000").click(function(){
		if($("#end_6000").attr('class').includes("disabled")){
			return;
		}
		$("#end_text").val(6000);
		$("#end_6000").css("background-color", "#3B8DE0");
		$("#end_0 , #end_500 , #end_1000 , #end_2000 , #end_3000 , #end_4000 , #end_5000 , #end_7000 , #end_8000 , #end_9000 , #end_10000 , #end_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#begin_0, #begin_500, #begin_1000, #begin_2000, #begin_3000, #begin_4000, #begin_5000, #begin_6000").removeClass("disabled");
		$("#begin_7000, #begin_8000, #begin_9000, #begin_10000, #begin_unlimited").addClass("disabled");
		if($("#begin_text").val()*1 > 6000 || $("#begin_text").val() === ""){
			$("#begin_text").val(6000); 
		}
		$("#deposit").empty().append("(보)"+$("#begin_text").val()+"만 ~ "+$("#end_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#end_7000").click(function(){
		if($("#end_7000").attr('class').includes("disabled")){
			return;
		}
		$("#end_text").val(7000);
		$("#end_7000").css("background-color", "#3B8DE0");
		$("#end_0 , #end_500 , #end_1000 , #end_2000 , #end_3000 , #end_4000 , #end_5000 , #end_6000 , #end_8000 , #end_9000 , #end_10000 , #end_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#begin_0, #begin_500, #begin_1000, #begin_2000, #begin_3000, #begin_4000, #begin_5000, #begin_6000, #begin_7000").removeClass("disabled");
		$("#begin_8000, #begin_9000, #begin_10000, #begin_unlimited").addClass("disabled");
		if($("#begin_text").val()*1 > 7000 || $("#begin_text").val() === ""){
			$("#begin_text").val(7000); 
		}
		$("#deposit").empty().append("(보)"+$("#begin_text").val()+"만 ~ "+$("#end_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#end_8000").click(function(){
		if($("#end_8000").attr('class').includes("disabled")){
			return;
		}
		$("#end_text").val(8000);
		$("#end_8000").css("background-color", "#3B8DE0");
		$("#end_0 , #end_500 , #end_1000 , #end_2000 , #end_3000 , #end_4000 , #end_5000 , #end_6000 , #end_7000 , #end_9000 , #end_10000 , #end_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#begin_0, #begin_500, #begin_1000, #begin_2000, #begin_3000, #begin_4000, #begin_5000, #begin_6000, #begin_7000, #begin_8000").removeClass("disabled");
		$("#begin_9000, #begin_10000, #begin_unlimited").addClass("disabled");
		if($("#begin_text").val()*1 > 8000 || $("#begin_text").val() === ""){
			$("#begin_text").val(8000); 
		}
		$("#deposit").empty().append("(보)"+$("#begin_text").val()+"만 ~ "+$("#end_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#end_9000").click(function(){
		if($("#end_9000").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#end_text").val(9000);
		$("#end_9000").css("background-color", "#3B8DE0");
		$("#end_0 , #end_500 , #end_1000 , #end_2000 , #end_3000 , #end_4000 , #end_5000 , #end_6000 , #end_7000 , #end_8000 , #end_10000 , #end_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#begin_0, #begin_500, #begin_1000, #begin_2000, #begin_3000, #begin_4000, #begin_5000, #begin_6000, #begin_7000, #begin_8000, #begin_9000").removeClass("disabled");
		$("#begin_10000, #begin_unlimited").addClass("disabled");
		if($("#begin_text").val()*1 > 9000 || $("#begin_text").val() === ""){
			$("#begin_text").val(9000); 
		}
		$("#deposit").empty().append("(보)"+$("#begin_text").val()+"만 ~ "+$("#end_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#end_10000").click(function(){
		if($("#end_10000").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#end_text").val(10000);
		$("#end_10000").css("background-color", "#3B8DE0");
		$("#end_0 , #end_500 , #end_1000 , #end_2000 , #end_3000 , #end_4000 , #end_5000 , #end_6000 , #end_7000 , #end_8000 , #end_9000 , #end_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#begin_0, #begin_500, #begin_1000, #begin_2000, #begin_3000, #begin_4000, #begin_5000, #begin_6000, #begin_7000, #begin_8000, #begin_9000, #begin_10000").removeClass("disabled");
		$("#begin_unlimited").addClass("disabled");
		if($("#begin_text").val()*1 > 10000 || $("#begin_text").val() === ""){
			$("#begin_text").val(10000); 
		}
		$("#deposit").empty().append("(보)"+$("#begin_text").val()+"만 ~ "+$("#end_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#end_unlimited").click(function(){
		if($("#end_unlimited").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#end_text").val(99999);
		$("#end_unlimited").css("background-color", "#3B8DE0");
		$("#end_0 , #end_500 , #end_1000 , #end_2000 , #end_3000 , #end_4000 , #end_5000 , #end_6000 , #end_7000 , #end_8000 , #end_9000 , #end_10000").css("background-color", "rgba(0,0,0,0)");
		$("#begin_0, #begin_500, #begin_1000, #begin_2000, #begin_3000, #begin_4000, #begin_5000, #begin_6000, #begin_7000, #begin_8000, #begin_9000, #begin_10000, #begin_unlimited").removeClass("disabled");
		if($("#begin_text").val()*1 > 9999 || $("#begin_text").val() === ""){
			$("#begin_text").val(9999); 
		}
		$("#deposit").empty().append("(보)"+$("#begin_text").val()+"만 ~ "+$("#end_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	

	
	////////////////////////////////////////////////////////////////////////////////
	//begin_text & end_text click event 
 	$("#begin_rent_text, #end_rent_text").click(function(){
 		if(isNaN($("#end_rent_text").val())) {
 	 		$("#end_rent_text").val(99999);
 	 	}
 	 	if(isNaN($("#begin_rent_text").val())) {
 	 		$("#begin_rent_text").val(0);
 	 	}
 		var begin = $("#begin_rent_text").val();
 		var end = $("#end_rent_text").val();
 	 	$("#rent_month").empty().append("(월)"+begin+"만 ~ "+end+"만");
 	});	
 	
 	//보증금 드랍다운 메뉴 클릭
 	$("#rent_month").click(function(){
 		var begin = $("#begin_rent_text").val();
 		var end = $("#end_rent_text").val();
 	 	$("#rent_month").empty().append("(월)"+begin+"만 ~ "+end+"만");
 		if(isNaN(end)) {
 	 		$("#end_rent_text").val(99999);
 	 		$("#rent_month").empty().append("(월)"+begin+"만 ~ "+end+"만");
 	 	}
 	 	if(isNaN(begin)) {
 	 		$("#begin_rent_text").val(0);
 	 		$("#rent_month").empty().append("(월)"+begin+"만 ~ "+end+"만");
 	 	}
 	 	
  	});	
	
	//월세 가격
    // 0 만원 부터
	$("#begin_rent_0").click(function(){
		if($("#begin_rent_0").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#begin_rent_text").val(0);
		$("#begin_rent_0").css("background-color", "#3B8DE0");
		$("#begin_rent_10 , #begin_rent_20 , #begin_rent_30 , #begin_rent_40 , #begin_rent_50 , #begin_rent_60 , #begin_rent_70 , #begin_rent_80 , #begin_rent_90 , #begin_rent_100, #begin_rent_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#end_rent_10, #end_rent_20, #end_rent_30, #end_rent_40, #end_rent_50, #end_rent_60, #end_rent_70, #end_rent_80, #end_rent_90, #end_rent_100, #end_rent_unlimited").removeClass("disabled");
		$("#rent_month").empty().append("(월)"+$("#begin_rent_text").val()+"만 ~ "+$("#end_rent_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#begin_rent_10").click(function(){
		if($("#begin_rent_10").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#begin_rent_text").val(10);
		$("#begin_rent_10").css("background-color", "#3B8DE0");
		$("#begin_rent_0, #begin_rent_20, #begin_rent_30, #begin_rent_40, #begin_rent_50, #begin_rent_60, #begin_rent_70, #begin_rent_80, #begin_rent_90, #begin_rent_100, #begin_rent_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#end_rent_0").addClass("disabled");
		$("#end_rent_10, #end_rent_20, #end_rent_30, #end_rent_40, #end_rent_50, #end_rent_60, #end_rent_70, #end_rent_80, #end_rent_90, #end_rent_100, #end_rent_unlimited").removeClass("disabled");
		if($("#end_rent_text").val()*1 < 10 || $("#end_rent_text").val() === ""){
			$("#end_rent_text").val(10); 
		}
		$("#rent_month").empty().append("(월)"+$("#begin_rent_text").val()+"만 ~ "+$("#end_rent_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#begin_rent_20").click(function(){
		if($("#begin_rent_20").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#begin_rent_text").val(20);
		$("#begin_rent_20").css("background-color", "#3B8DE0");
		$("#begin_rent_0, #begin_rent_10, #begin_rent_30, #begin_rent_40, #begin_rent_50 , #begin_rent_60, #begin_rent_70, #begin_rent_80, #begin_rent_90, #begin_rent_100, #begin_rent_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#end_rent_0, #end_rent_10").addClass("disabled");
		$("#end_rent_20, #end_rent_30, #end_rent_40, #end_rent_50, #end_rent_60, #end_rent_70, #end_rent_80, #end_rent_90, #end_rent_100, #end_rent_unlimited").removeClass("disabled");
		if($("#end_rent_text").val()*1 < 20 || $("#end_rent_text").val() === ""){
			$("#end_rent_text").val(20); 
		}
		$("#rent_month").empty().append("(월)"+$("#begin_rent_text").val()+"만 ~ "+$("#end_rent_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#begin_rent_30").click(function(){
		if($("#begin_rent_30").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#begin_rent_text").val(30);
		$("#begin_rent_30").css("background-color", "#3B8DE0");
		$("#begin_rent_0, #begin_rent_10, #begin_rent_20, #begin_rent_40, #begin_rent_50, #begin_rent_60, #begin_rent_70, #begin_rent_80, #begin_rent_90, #begin_rent_100, #begin_rent_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#end_rent_0, #end_rent_10, #end_rent_20").addClass("disabled");
		$("#end_rent_30, #end_rent_40, #end_rent_50, #end_rent_60, #end_rent_70, #end_rent_80, #end_rent_90, #end_rent_100, #end_rent_unlimited").removeClass("disabled");
		if($("#end_rent_text").val()*1 < 30 || $("#end_rent_text").val() === ""){
			$("#end_rent_text").val(30); 
		}
		$("#rent_month").empty().append("(월)"+$("#begin_rent_text").val()+"만 ~ "+$("#end_rent_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#begin_rent_40").click(function(){
		if($("#begin_rent_40").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#begin_rent_text").val(40);
		$("#begin_rent_40").css("background-color", "#3B8DE0");
		$("#begin_rent_0, #begin_rent_10, #begin_rent_20, #begin_rent_30, #begin_rent_50, #begin_rent_60, #begin_rent_70, #begin_rent_80, #begin_rent_90, #begin_rent_100, #begin_rent_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#end_rent_0, #end_rent_10, #end_rent_20, #end_rent_30").addClass("disabled");
		$("#end_rent_40, #end_rent_50, #end_rent_60, #end_rent_70, #end_rent_80, #end_rent_90, #end_rent_100, #end_rent_unlimited").removeClass("disabled");
		if($("#end_rent_text").val()*1 < 40 || $("#end_rent_text").val() === ""){
			$("#end_rent_text").val(40); 
		}
		$("#rent_month").empty().append("(월)"+$("#begin_rent_text").val()+"만 ~ "+$("#end_rent_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#begin_rent_50").click(function(){
		if($("#begin_rent_50").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#begin_rent_text").val(50);
		$("#begin_rent_50").css("background-color", "#3B8DE0");
		$("#begin_rent_0 , #begin_rent_10, #begin_rent_20, #begin_rent_30, #begin_rent_40, #begin_rent_60, #begin_rent_70, #begin_rent_80, #begin_rent_90, #begin_rent_100, #begin_rent_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#end_rent_0, #end_rent_10, #end_rent_20, #end_rent_30, #end_rent_40").addClass("disabled");
		$("#end_rent_50, #end_rent_60, #end_rent_70, #end_rent_80, #end_rent_90, #end_rent_100, #end_rent_unlimited").removeClass("disabled");
		if($("#end_rent_text").val()*1 < 50 || $("#end_rent_text").val() === ""){
			$("#end_rent_text").val(50); 
		}
		$("#rent_month").empty().append("(월)"+$("#begin_rent_text").val()+"만 ~ "+$("#end_rent_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#begin_rent_60").click(function(){
		if($("#begin_rent_60").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#begin_rent_text").val(60);
		$("#begin_rent_60").css("background-color", "#3B8DE0");
		$("#begin_rent_0, #begin_rent_10, #begin_rent_20, #begin_rent_30, #begin_rent_40, #begin_rent_50, #begin_rent_70, #begin_rent_80, #begin_rent_90, #begin_rent_100, #begin_rent_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#end_rent_0, #end_rent_10, #end_rent_20, #end_rent_30, #end_rent_40, #end_rent_50").addClass("disabled");
		$("#end_rent_60, #end_rent_70, #end_rent_80, #end_rent_90, #end_rent_100, #end_rent_unlimited").removeClass("disabled");
		if($("#end_rent_text").val()*1 < 60 || $("#end_rent_text").val() === ""){
			$("#end_rent_text").val(60); 
		}
		$("#rent_month").empty().append("(월)"+$("#begin_rent_text").val()+"만 ~ "+$("#end_rent_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#begin_rent_70").click(function(){
		if($("#begin_rent_70").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#begin_rent_text").val(70);
		$("#begin_rent_70").css("background-color", "#3B8DE0");
		$("#begin_rent_0, #begin_rent_10, #begin_rent_20, #begin_rent_30, #begin_rent_40, #begin_rent_50, #begin_rent_60, #begin_rent_80, #begin_rent_90, #begin_rent_100, #begin_rent_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#end_rent_0, #end_rent_10, #end_rent_20, #end_rent_30, #end_rent_40, #end_rent_50, #end_rent_60").addClass("disabled");
		$("#end_rent_70, #end_rent_80, #end_rent_90, #end_rent_100, #end_rent_unlimited").removeClass("disabled");
		if($("#end_rent_text").val()*1 < 70 || $("#end_rent_text").val() === ""){
			$("#end_rent_text").val(70); 
		}
		$("#rent_month").empty().append("(월)"+$("#begin_rent_text").val()+"만 ~ "+$("#end_rent_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#begin_rent_80").click(function(){
		if($("#begin_rent_80").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#begin_rent_text").val(80);
		$("#begin_rent_80").css("background-color", "#3B8DE0");
		$("#begin_rent_0, #begin_rent_10, #begin_rent_20, #begin_rent_30, #begin_rent_40, #begin_rent50, #begin_rent_60, #begin_rent_70, #begin_rent_90, #begin_rent_100, #begin_rent_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#end_rent_0, #end_rent_10, #end_rent_20, #end_rent_30, #end_rent_40, #end_rent_50, #end_rent_60, #end_rent_70").addClass("disabled");
		$("#end_rent_80, #end_rent_90, #end_rent_100, #end_rent_unlimited").removeClass("disabled");
		if($("#end_rent_text").val()*1 < 80 || $("#end_rent_text").val() === ""){
			$("#end_rent_text").val(80); 
		}
		$("#rent_month").empty().append("(월)"+$("#begin_rent_text").val()+"만 ~ "+$("#end_rent_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#begin_rent_90").click(function(){
		if($("#begin_rent_90").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#begin_rent_text").val(90);
		$("#begin_rent_90").css("background-color", "#3B8DE0");
		$("#begin_rent_0, #begin_rent_10, #begin_rent_20, #begin_rent_30, #begin_rent_40, #begin_rent_50, #begin_rent_60, #begin_rent_70, #begin_rent_80, #begin_rent_100, #begin_rent_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#end_rent_0, #end_rent_10, #end_rent_20, #end_rent_30, #end_rent_40, #end_rent_50, #end_rent_60, #end_rent_70, #end_rent_80").addClass("disabled");
		$("#end_rent_90, #end_rent_100, #end_rent_unlimited").removeClass("disabled");
		if($("#end_rent_text").val()*1 < 90 || $("#end_rent_text").val() === ""){
			$("#end_rent_text").val(90); 
		}
		$("#rent_month").empty().append("(월)"+$("#begin_rent_text").val()+"만 ~ "+$("#end_rent_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#begin_rent_100").click(function(){
		if($("#begin_rent_100").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#begin_rent_text").val(100);
		$("#begin_rent_100").css("background-color", "#3B8DE0");
		$("#begin_rent_0 , #begin_rent_10 , #begin_rent_20, #begin_rent_30, #begin_rent_40, #begin_rent_50, #begin_rent_60, #begin_rent_70, #begin_rent_80, #begin_rent_90, #begin_rent_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#end_rent_0, #end_rent_10, #end_rent_20, #end_rent_30, #end_rent_40, #end_rent_50, #end_rent_60, #end_rent_70, #end_rent_80, #end_rent_90").addClass("disabled");
		$("#end_rent_100, #end_rent_unlimited").removeClass("disabled");
		if($("#end_rent_text").val()*1 < 100 || $("#end_rent_text").val() === ""){
			$("#end_rent_text").val(100); 
		}
		$("#rent_month").empty().append("(월)"+$("#begin_rent_text").val()+"만 ~ "+$("#end_rent_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#begin_rent_unlimited").click(function(){
		if($("#begin_rent_unlimited").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#begin_rent_text").val(9999);
		$("#begin_rent_unlimited").css("background-color", "#3B8DE0");
		$("#begin_rent_0, #begin_rent_10, #begin_rent_20, #begin_rent_30, #begin_rent_40, #begin_rent_50, #begin_rent_60, #begin_rent_70, #begin_rent_80, #begin_rent_90, #begin_rent_100").css("background-color", "rgba(0,0,0,0)");
		$("#end_rent_0, #end_rent_10, #end_rent_20, #end_rent_30, #end_rent_40, #end_rent_50, #end_rent_60, #end_rent_70, #end_rent_80, #end_rent_90, #end_rent_100").addClass("disabled");
		$("#end_rent_unlimited").removeClass("disabled");
		if($("#end_rent_text").val()*1 < 9999 || $("#end_rent_text").val() === ""){
			$("#end_rent_text").val(9999); 
		}
		$("#rent_month").empty().append("(월)"+$("#begin_rent_text").val()+"만 ~ "+$("#end_rent_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	// 보증금 0원 까지
	$("#end_rent_0").click(function(){
		if($("#end_rent_0").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#end_rent_text").val(0);
		$("#end_rent_0").css("background-color", "#3B8DE0");
		$("#end_rent_10, #end_rent_20, #end_rent_30, #end_rent_40, #end_rent_50, #end_rent_60, #end_rent_70, #end_rent_80, #end_rent_90, #end_rent_100, #end_rent_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#begin_rent_0, #begin_rent_10, #begin_rent_20, #begin_rent_30, #begin_rent_40, #begin_rent_50, #begin_rent_60, #begin_rent_70, #begin_rent_80, #begin_rent_90, #begin_rent_100, #begin_rent_unlimited").addClass("disabled");
		if($("#begin_rent_text").val()*1 != 0 || $("#begin_rent_text").val() === ""){
			$("#begin_rent_text").val(0); 
		}
		$("#rent_month").empty().append("(월)"+$("#begin_rent_text").val()+"만 ~ "+$("#end_rent_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#end_rent_10").click(function(){
		if($("#end_rent_10").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#end_rent_text").val(10);
		$("#end_rent_10").css("background-color", "#3B8DE0");
		$("#end_rent_0, #end_rent_20, #end_rent_30, #end_rent_40, #end_rent_50, #end_rent_60, #end_rent_70, #end_rent_80, #end_rent_90, #end_rent_100, #end_rent_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#begin_rent_0, #begin_rent_10").removeClass("disabled");
		$("#begin_rent_20, #begin_rent_30, #begin_rent_40, #begin_rent_50, #begin_rent_60, #begin_rent_70, #begin_rent_80, #begin_rent_90, #begin_rent_100, #begin_rent_unlimited").addClass("disabled");
		if($("#begin_rent_text").val()*1 > 10 || $("#begin_rent_text").val() === ""){
			$("#begin_rent_text").val(10); 
		}
		$("#rent_month").empty().append("(월)"+$("#begin_rent_text").val()+"만 ~ "+$("#end_rent_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#end_rent_20").click(function(){
		if($("#end_rent_20").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#end_rent_text").val(20);
		$("#end_rent_20").css("background-color", "#3B8DE0");
		$("#end_rent_0 , #end_rent_10 , #end_rent_30, #end_rent_40, #end_rent_50, #end_rent_60, #end_rent_70, #end_rent_80, #end_rent_90, #end_rent_100, #end_rent_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#begin_rent_10, #begin_rent_20").removeClass("disabled");
		$("#begin_rent_30, #begin_rent_40, #begin_rent_50, #begin_rent_60, #begin_rent_70, #begin_rent_80, #begin_rent_90, #begin_rent_100, #begin_rent_unlimited").addClass("disabled");
		if($("#begin_rent_text").val()*1 > 20 || $("#begin_rent_text").val() === ""){
			$("#begin_rent_text").val(20); 
		}
		$("#rent_month").empty().append("(월)"+$("#begin_rent_text").val()+"만 ~ "+$("#end_rent_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#end_rent_30").click(function(){
		if($("#end_rent_30").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#end_rent_text").val(30);
		$("#end_rent_30").css("background-color", "#3B8DE0");
		$("#end_rent_0, #end_rent_10, #end_rent_20, #end_rent_40, #end_rent_50, #end_rent_60, #end_rent_70, #end_rent_80, #end_rent_90, #end_rent_100, #end_rent_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#begin_rent_0, #begin_rent_10, #begin_rent_20, #begin_rent_30").removeClass("disabled");
		$("#begin_rent_40, #begin_rent_50, #begin_rent_60, #begin_rent_70, #begin_rent_80, #begin_rent_90, #begin_rent_100, #begin_rent_unlimited").addClass("disabled");
		if($("#begin_rent_text").val()*1 > 30 || $("#begin_rent_text").val() === ""){
			$("#begin_rent_text").val(30); 
		}
		$("#rent_month").empty().append("(월)"+$("#begin_rent_text").val()+"만 ~ "+$("#end_rent_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#end_rent_40").click(function(){
		if($("#end_rent_40").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#end_rent_text").val(40);
		$("#end_rent_40").css("background-color", "#3B8DE0");
		$("#end_rent_0 , #end_rent_10 , #end_rent_20, #end_rent_30, #end_rent_50, #end_rent_60, #end_rent_70, #end_rent_80, #end_rent_90, #end_rent_100, #end_rent_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#begin_rent_0, #begin_rent_10, #begin_rent_20, #begin_rent_30, #begin_rent_40").removeClass("disabled");
		$("#begin_rent_50, #begin_rent_60, #begin_rent_70, #begin_rent_80, #begin_rent_90, #begin_rent_100, #begin_rent_unlimited").addClass("disabled");
		if($("#begin_rent_text").val()*1 > 40 || $("#begin_rent_text").val() === ""){
			$("#begin_rent_text").val(40); 
		}
		$("#rent_month").empty().append("(월)"+$("#begin_rent_text").val()+"만 ~ "+$("#end_rent_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#end_rent_50").click(function(){
		if($("#end_rent_50").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#end_rent_text").val(50);
		$("#end_rent_50").css("background-color", "#3B8DE0");
		$("#end_rent_0 , #end_rent_10 , #end_rent_20, #end_rent_30, #end_rent_40, #end_rent_60, #end_rent_70, #end_rent_80, #end_rent_90, #end_rent_100, #end_rent_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#begin_rent_0, #begin_rent_10, #begin_rent_20, #begin_rent_30, #begin_rent_40, #begin_rent_50").removeClass("disabled");
		$("#begin_rent_60, #begin_rent_70, #begin_rent_80, #begin_rent_90, #begin_rent_100, #begin_rent_unlimited").addClass("disabled");
		if($("#begin_rent_text").val()*1 > 50 || $("#begin_rent_text").val() === ""){
			$("#begin_rent_text").val(50); 
		}
		$("#rent_month").empty().append("(월)"+$("#begin_rent_text").val()+"만 ~ "+$("#end_rent_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#end_rent_60").click(function(){
		if($("#end_rent_60").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#end_rent_text").val(60);
		$("#end_rent_60").css("background-color", "#3B8DE0");
		$("#end_rent_0 , #end_rent_10, #end_rent_20, #end_rent_30, #end_rent_40, #end_rent_50, #end_rent_70, #end_rent_80, #end_rent_90, #end_rent_100, #end_rent_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#begin_rent_0, #begin_rent_10, #begin_rent_20, #begin_rent_30, #begin_rent_40, #begin_rent_50, #begin_rent_60").removeClass("disabled");
		$("#begin_rent_70, #begin_rent_80, #begin_rent_90, #begin_rent_100, #begin_rent_unlimited").addClass("disabled");
		if($("#begin_rent_text").val()*1 > 60 || $("#begin_rent_text").val() === ""){
			$("#begin_rent_text").val(60); 
		}
		$("#rent_month").empty().append("(월)"+$("#begin_rent_text").val()+"만 ~ "+$("#end_rent_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#end_rent_70").click(function(){
		if($("#end_rent_70").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#end_rent_text").val(70);
		$("#end_rent_70").css("background-color", "#3B8DE0");
		$("#end_rent_0 , #end_rent_10 , #end_rent_20, #end_rent_30, #end_rent_40, #end_rent_50, #end_rent_60, #end_rent_80, #end_rent_90, #end_rent_100, #end_rent_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#begin_rent_0, #begin_rent_10, #begin_rent_20, #begin_rent_30, #begin_rent_40, #begin_rent_50, #begin_rent_60, #begin_rent_70").removeClass("disabled");
		$("#begin_rent_80, #begin_rent_90, #begin_rent_100, #begin_rent_unlimited").addClass("disabled");
		if($("#begin_rent_text").val()*1 > 70 || $("#begin_rent_text").val() === ""){
			$("#begin_rent_text").val(70); 
		}
		$("#rent_month").empty().append("(월)"+$("#begin_rent_text").val()+"만 ~ "+$("#end_rent_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#end_rent_80").click(function(){
		if($("#end_rent_80").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#end_rent_text").val(80);
		$("#end_rent_80").css("background-color", "#3B8DE0");
		$("#end_rent_0 , #end_rent_10 , #end_rent_20, #end_rent_30, #end_rent_40, #end_rent_50, #end_rent_60, #end_rent_70, #end_rent_90, #end_rent_100, #end_rent_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#begin_rent_0, #begin_rent_10, #begin_rent_20, #begin_rent_30, #begin_rent_40, #begin_rent_50, #begin_rent_60, #begin_rent_70, #begin_rent_80").removeClass("disabled");
		$("#begin_rent_90, #begin_rent_100, #begin_rent_unlimited").addClass("disabled");
		if($("#begin_rent_text").val()*1 > 80 || $("#begin_rent_text").val() === ""){
			$("#begin_rent_text").val(80); 
		}
		$("#rent_month").empty().append("(월)"+$("#begin_rent_text").val()+"만 ~ "+$("#end_rent_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#end_rent_90").click(function(){
		if($("#end_rent_90").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#end_rent_text").val(90);
		$("#end_rent_90").css("background-color", "#3B8DE0");
		$("#end_rent_0 , #end_rent_10, #end_rent_20, #end_rent_30, #end_rent_40, #end_rent_50, #end_rent_60, #end_rent_70, #end_rent_80, #end_rent_100, #end_rent_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#begin_rent_0, #begin_rent_10, #begin_rent_20, #begin_rent_30, #begin_rent_40, #begin_rent_50, #begin_rent_60, #begin_rent_70, #begin_rent_80, #begin_rent_90").removeClass("disabled");
		$("#begin_rent_100, #begin_rent_unlimited").addClass("disabled");
		if($("#begin_rent_text").val()*1 > 90 || $("#begin_rent_text").val() === ""){
			$("#begin_rent_text").val(90); 
		}
		$("#rent_month").empty().append("(월)"+$("#begin_rent_text").val()+"만 ~ "+$("#end_rent_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#end_rent_100").click(function(){
		if($("#end_rent_100").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#end_rent_text").val(100);
		$("#end_rent_100").css("background-color", "#3B8DE0");
		$("#end_rent_0 , #end_rent_10 , #end_rent_20, #end_rent_30, #end_rent_40, #end_rent_50, #end_rent_60, #end_rent_70, #end_rent_80, #end_rent_90, #end_rent_unlimited").css("background-color", "rgba(0,0,0,0)");
		$("#begin_rent_0, #begin_rent_10, #begin_rent_20, #begin_rent_30, #begin_rent_40, #begin_rent_50, #begin_rent_60, #begin_rent_70, #begin_rent_80, #begin_rent_90, #begin_rent_100").removeClass("disabled");
		$("#begin_rent_unlimited").addClass("disabled");
		if($("#begin_rent_text").val()*1 > 100 || $("#begin_rent_text").val() === ""){
			$("#begin_rent_text").val(100); 
		}
		$("#rent_month").empty().append("(월)"+$("#begin_rent_text").val()+"만 ~ "+$("#end_rent_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	$("#end_rent_unlimited").click(function(){
		if($("#end_rent_unlimited").attr('class').includes("disabled")){
			//alert("선택할 수 없습니다.");
			return;
		}
		$("#end_rent_text").val(9999);
		$("#end_rent_unlimited").css("background-color", "#3B8DE0");
		$("#end_rent_0, #end_rent_10, #end_rent_20, #end_rent_30, #end_rent_40, #end_rent_50, #end_rent_60, #end_rent_70, #end_rent_80, #end_rent_90, #end_rent_100").css("background-color", "rgba(0,0,0,0)");
		$("#begin_rent_0, #begin_rent_10, #begin_rent_20, #begin_rent_30, #begin_rent_40, #begin_rent_50, #begin_rent_60, #begin_rent_70, #begin_rent_80, #begin_rent_90, #begin_rent_100, #begin_rent_unlimited").removeClass("disabled");
		if($("#begin_rent_text").val()*1 > 9999 || $("#begin_rent_text").val() === ""){
			$("#begin_rent_text").val(9999); 
		}
		$("#rent_month").empty().append("(월)"+$("#begin_rent_text").val()+"만 ~ "+$("#end_rent_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	// 추가 사항  주차, 반려동물 체크 박스 
	var options = [];
	$('.option_ckeck').on( 'click', function( event ) {
	   
	   var $target = $( event.currentTarget ),
	       val = $target.attr( 'data-value' ),
	       $inp = $target.find( 'input' ),
	       idx;
	
	   if ( ( idx = options.indexOf( val ) ) > -1 ) {
	      options.splice( idx, 1 );
	      setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
	   } else {
	      options.push( val );
	      setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
	   }
	
	   $( event.target ).blur();
	      
	   console.log( options );
	   checkBox(options);
	   return false
	});
	//checkBox체크
	function checkBox(options){
		$("#parking").val("");
		$("#animal").val("");
		if(options.includes("parking")){
			$("#parking").val(1);
			
		}else{
			$("#parking").val("");
		}
		if(options.includes("animal")){
			$("#animal").val(1);
		}else{
			$("#animal").val("");
		}
		options = [];
		console.log("parkingValue: "+$("#parking").val()+"animalValue: "+$("#animal").val());
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
		
	}	
	
    // 추가 사항 평수 체크 박스  라디오 요소처럼 동작시킬 체크박스 그룹 셀렉터
	
	$('.option_ckeck1').on( 'click', function( event ) {
		var area = "";
		$("#startArea").val("");
		$("#endArea").val("");
		var $target = $( event.currentTarget ),
		$inp = $target.find( 'input' )
		        
		if (!$inp.prop('checked')) {
			$('input[type="checkbox"][name="group"]').prop('checked', false);
			$inp.prop('checked', true);
			area = $target.attr( 'data-value' );
		}else{
        	$inp.prop('checked', false);
        	area = "";
        }
		
		if(area ==="under5"){
			$("#startArea").val(0);
			$("#endArea").val(16.5);
		}else if(area ==="under10"){
			$("#startArea").val(16.5);
			$("#endArea").val(33.3);
		}else if(area ==="over10"){
			$("#startArea").val(33.3);
			$("#endArea").val(9999.9);
		}else{
			$("#startArea").val("");
			$("#endArea").val("");
		}
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
		return false;
    });
	
	// 추가 사항 층수 체크 박스 
	var floor = null;
	$('.option_ckeck2').on( 'click', function( event ) {
		$("#startFloor").val("");
		$("#endFloor").val("");
		var $target = $( event.currentTarget ),
		$inp = $target.find( 'input' ),
		val = $target.attr( 'data-value' )
        
		if (!$inp.prop('checked')) {
			$('input[type="checkbox"][name="group1"]').prop('checked', false);
			$inp.prop('checked', true);
			floor = $target.attr( 'data-value' );
		}else{
        	$inp.prop('checked', false);
        	floor = "";
        }
		
		if(floor ==="groundFloor"){
			$("#startFloor").val(-1);
			$("#endFloor").val(-1);
		}else if(floor ==="BottomFloor"){
			$("#startFloor").val(1);
			$("#endFloor").val(3);
		}else if(floor ==="middleFloor"){
			$("#startFloor").val(4);
			$("#endFloor").val(6);
		}else if(floor ==="heightFloor"){
			$("#startFloor").val(7);
			$("#endFloor").val(19);
		}else if(floor ==="topFloor"){
			$("#startFloor").val(19);
			$("#endFloor").val(99);
		}else if(floor ==="topRoom"){
			$("#startFloor").val(100);
			$("#endFloor").val(100);
		}else{
			$("#startFloor").val("");
			$("#endFloor").val("");
		}
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
		return false;
    });
	
	
	
	// 보증금 드랍박스 hide 안되게
	$(function() {
        $('#drop_deposit_begin').on({
        	"click": function(event) {
              if ($(event.target).closest('.dropdown-toggle').length) {
                $(this).data('closable', false);
              } else {
                $(this).data('closable', false);
              }
            },
            "hide.bs.dropdown": function(event) {
              hide = $(this).data('closable');
              $(this).data('closable', true);
              return hide;
            }
        });
    });
	
	// 월세 드랍박스 hide 안되게
	$(function() {
        $('#drop_rent_month').on({
            "click": function(event) {
              if ($(event.target).closest('.dropdown-toggle').length) {
                $(this).data('closable', false);
              } else {
                $(this).data('closable', false);
              }
            },
            "hide.bs.dropdown": function(event) {
              hide = $(this).data('closable');
              $(this).data('closable', true);
              return hide;
            }
        });
    });
	
	
    // 매물 종류/////////////////////////////////////
	 $("#kind_of_sale").change(function (){
		 console.log("매물종류 변경");
	 });
	// 전체
	$("#all_rent").click( function () {
		  var arc = $("#all_rent").text();
		  $("#kind_of_sale").empty().append(arc);
		  pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	// 월세
	$("#month_rent").click( function () {
		  var arc = $("#month_rent").text();
		  $("#kind_of_sale").empty().append(arc);
		  pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
    // 전세or월세
	$("#engage_or_rent").click( function () {
		  var arc = $("#engage_or_rent").text();
		  $("#kind_of_sale").empty().append(arc);
		  pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
    // 전세
	$("#engage").click( function () {
		  var arc = $("#engage").text();
		  $("#kind_of_sale").empty().append(arc);
		  pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
    // 매매
	$("#sale").click( function () {
		  var arc = $("#sale").text();
		  $("#kind_of_sale").empty().append(arc);
		  pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
	
	// 거래 종류///////////////////////////////////////////
//	 $("#kind_of_trade").change(function (){
//		 console.log("거래종류 변경"+$("#kind_of_trade").val());
//	 });
	
    // 전체
	$("#all").click( function () {
		  var arc = $("#all").text();
		  $("#kind_of_trade").empty().append(arc);
		  pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
    // 중개
	$("#estate_agent").click( function () {
		  var arc = $("#estate_agent").text();
		  $("#kind_of_trade").empty().append(arc);
		  pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
    // 직거래
	$("#direct_deal").click( function () {
		  var arc = $("#direct_deal").text();
		  $("#kind_of_trade").empty().append(arc);
		  pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});

	// 방종류
    // 전체
	$("#room_count_all").click( function () {
		  var arc = $("#room_count_all").text();
		  $("#kind_of_room").empty().append(arc);
		  pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
    // 원룸
	$("#room_count_1").click( function () {
		  var arc = $("#room_count_1").text();
		  $("#kind_of_room").empty().append(arc);
		  pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
    // 1.5룸
	$("#room_count_15").click( function () {
		  var arc = $("#room_count_15").text();
		  $("#kind_of_room").empty().append(arc);
		  pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
    // 투룸
	$("#room_count_2").click( function () {
		  var arc = $("#room_count_2").text();
		  $("#kind_of_room").empty().append(arc);
		  pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
    // 쓰리룲
	$("#room_count_3").click( function () {
		  var arc = $("#room_count_3").text();
		  $("#kind_of_room").empty().append(arc);
		  pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
    // 오피스텔
	$("#room_count_office").click( function () {
		  var arc = $("#room_count_office").text();
		  $("#kind_of_room").empty().append(arc);
		  pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
	});
    // 아파트
	$("#room_count_appart").click( function () {
		console.log("아파트 선택 인입");
		  var arc = $("#room_count_appart").text();
		  $("#kind_of_room").empty().append(arc);
		  pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
		  //search();
	});
	/////////////////////////////////////////////////////////////

	
	// 추가 옵션
    // 주차가능
	$("#dropdown-item_1").click( function () {
		  var arc = $("#dropdown-item_1").text();
		  $("#navbar_main_dropdown_1").empty().append(arc);
	});
    // 반려동물 가능
	$("#dropdown-item_1").click( function () {
		  var arc = $("#dropdown-item_1").text();
		  $("#navbar_main_dropdown_1").empty().append(arc);
	});
    // 단기 임대
	$("#dropdown-item_1").click( function () {
		  var arc = $("#dropdown-item_1").text();
		  $("#navbar_main_dropdown_1").empty().append(arc);
	});
    // 5평 이하
	$("#dropdown-item_1").click( function () {
		  var arc = $("#dropdown-item_1").text();
		  $("#navbar_main_dropdown_1").empty().append(arc);
	});
    // 5~10평
	$("#dropdown-item_1").click( function () {
		  var arc = $("#dropdown-item_1").text();
		  $("#navbar_main_dropdown_1").empty().append(arc);
	});
    // 10평 이상
	$("#dropdown-item_1").click( function () {
		  var arc = $("#dropdown-item_1").text();
		  $("#navbar_main_dropdown_1").empty().append(arc);
	});
    // 반지층
	$("#dropdown-item_1").click( function () {
		  var arc = $("#dropdown-item_1").text();
		  $("#navbar_main_dropdown_1").empty().append(arc);
	});
    // 저층(1~3층)
	$("#dropdown-item_1").click( function () {
		  var arc = $("#dropdown-item_1").text();
		  $("#navbar_main_dropdown_1").empty().append(arc);
	});
    // 중층(4~6층)
	$("#dropdown-item_1").click( function () {
		  var arc = $("#dropdown-item_1").text();
		  $("#navbar_main_dropdown_1").empty().append(arc);
	});
    // 고층(7층~19층)
	$("#dropdown-item_1").click( function () {
		  var arc = $("#dropdown-item_1").text();
		  $("#navbar_main_dropdown_1").empty().append(arc);
	});
    // 초고층(20층 이상)
	$("#dropdown-item_1").click( function () {
		  var arc = $("#dropdown-item_1").text();
		  $("#navbar_main_dropdown_1").empty().append(arc);
	});
    // 옥탑
	$("#dropdown-item_1").click( function () {
		  var arc = $("#dropdown-item_1").text();
		  $("#navbar_main_dropdown_1").empty().append(arc);
	});
	
	//////////////////////관심목록 등록////////////////////////
	
	//매물 마우스 오버
	function changebgc(c){
		$(c).mouseover(function(){
			$(c).css('background-color', '#D2E5FF');
			//e6e6e6
		});
	}

	//매물 마우스 아웃
	$(".itemList").mouseout(function(){
		$('.itemList').css('background-color', '');
		//e6e6e6
	});
	
});	

//좋아요 하트 버튼 동작
function heart(that){
	if($("#email").val() === null || $("#email").val() === undefined || $("#email").val() === ""){
		$("#log-in").click();
	}
	if($("#email").val() == null || $("#email").val() == undefined || $("#email").val() == ''){
		$("#requestcalling").modal('hide');
		alert("로그인 후 이용가능합니다.");
		return false;
	}else{
		if($(that).children().children().attr('class').includes("o")){
			$(that).children().children().removeClass().addClass("fa fa-heart fa-2x");
		}else {
			$(that).children().children().removeClass().addClass("fa fa-heart-o fa-2x");
		}
		var build_no = $(that).next().find( '[name = build_no]');
		var seq = build_no.val();
		console.log("build_no: "+seq);
		$.ajax({
			url : "heart.do",
			type : "POST",
			data : {"seq" : seq}
	
		});
	}
}




//하트 마우스 오버
function heartMouseOver(that){
	$(that).css('color', 'red');
}

//하트 마우스 아웃
function heartMouseOut(that){
	$(that).css("color", "gray");
}

//매물 마우스 오버시 백컬러 변경
var customMarker;

function getterLatLng(that){
//	$(that).one("mouseover", function(){
		$(that).css('background-color', '#D2E5FF');
		var lng = $(that).find( '[name="lng"]' );
		var lat = $(that).find( '[name="lat"]' );
		var targetLng = lng.val()*1;
		var targetLat = lat.val()*1;
		//console.log("targetLng2: "+targetLng+"targetLat: "+targetLat);
		var coords = new daum.maps.LatLng(targetLat, targetLng);
	    customMarker = new daum.maps.Marker({
	    	position: coords,
	    	image: customMarkerImage
	    });
	    customMarker.setMap(map);
	    //map.setCenter(coords);
//	});
}


//매물 마우스 아웃 백컬러 변경
function buildMouseOut(that){
//	$(that).one("mouseout", function(){
		//console.log("매물 마우스아웃");
		customMarker.setMap(null);
		clusterer.removeMarker(customMarker);
		$(that).css('background-color', '');
//	});
}

//search 태우는곳
function search (){
	var protype = $("#kind_of_room").text();
	console.log("protype: "+protype);
	$.ajax({
		url : "map.do",
   		type : "get",
   		data : {protype : protype, listCnt : 10}
   		//success : function(responseData){}
	});
}
//보증금 부터~ 입력창
function beginKeyUp(){
	if(isNaN($("#end_text").val())){
		$("#end_text").val(99999);
	}
	if(isNaN($("#begin_text").val())) {
		$("#begin_text").val(0);
	}
	var end = $("#end_text").val();
	var begin = $("#begin_text").val();
	setTimeout(function() {
		if(end < begin && !isNaN(end) && !isNaN(begin)) $("#end_text").val(begin);
		$("#deposit").empty().append("(보)"+$("#begin_text").val()+"만 ~ "+$("#end_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
		}, 1000);
	
}
//보증금 ~까지 입력창
function endKeyUp(){
	if(isNaN($("#end_text").val())) {
		$("#end_text").val(9999);
	}
	if(isNaN($("#begin_text").val())) {
		$("#begin_text").val(0);
	}
	var end = $("#end_text").val();
	var begin = $("#begin_text").val();
	setTimeout(function() {
		if(end < begin && !isNaN(end) && !isNaN(begin)) $("#begin_text").val(end);
		$("#deposit").empty().append("(보)"+$("#begin_text").val()+"만 ~ "+$("#end_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
		}, 1000);
	
}
//월세 부터~ 입력창
function beginRentKeyUp(){
	if(isNaN($("#end_rent_text").val())){
		$("#end_rent_text").val(9999);
	}
	if(isNaN($("#begin_rent_text").val())) {
		$("#begin_rent_text").val(0);
	}
	var end = $("#end_rent_text").val();
	var begin = $("#begin_rent_text").val();
	setTimeout(function() {
		if(end < begin && !isNaN(end) && !isNaN(begin)) $("#end_rent_text").val(begin);
		$("#rent_month").empty().append("(보)"+$("#begin_rent_text").val()+"만 ~ "+$("#end_rent_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
		}, 1000);
	
}
//월세 ~까지 입력창
function endRentKeyUp(){
	if(isNaN($("#end_rent_text").val())) {
		$("#end_rent_text").val(9999);
	}
	if(isNaN($("#begin_rent_text").val())) {
		$("#begin_rent_text").val(0);
	}
	var end = $("#end_rent_text").val();
	var begin = $("#begin_rent_text").val();
	setTimeout(function() {
		if(end < begin && !isNaN(end) && !isNaN(begin)) $("#begin_rent_text").val(end);
		$("#rent_month").empty().append("(보)"+$("#begin_rent_text").val()+"만 ~ "+$("#end_rent_text").val()+"만");
		pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
		}, 1000);
	
}
//보증금 숫자만 입력 받을 수 있게 하는 메서드
function onlyNumber(obj) {
	if(isNaN($("#end_text").val())) {
		$("#end_text").val(99999);

	}
	if(isNaN($("#begin_text").val())) {
		$("#begin_text").val(0);

	}
    $(obj).keyup(function(){
         $(this).val($(this).val().replace(/[^0-9]/g,""));

    });
	var end = $("#end_text").val();
	var begin = $("#begin_text").val();
    
    $("#deposit").empty().append("(보)"+begin+"만 ~ "+end+"만");

}

//보증금 숫자만 입력 받을 수 있게 하는 메서드
function onlyRentNumber(obj) {
	if(isNaN($("#end_text").val())) {
		$("#end_text").val(99999);

	}
	if(isNaN($("#begin_text").val())) {
		$("#begin_text").val(0);

	}
    $(obj).keyup(function(){
         $(this).val($(this).val().replace(/[^0-9]/g,""));

    });
	var end = $("#end_text").val();
	var begin = $("#begin_text").val();
    
    $("#deposit").empty().append("(보)"+begin+"만 ~ "+end+"만");

}

//관심목록 - 찜한방 클릭시
$("#heartRoom").click(function(){
	console.log("찜한방 클릭 인입");
	var email = "1234@gmail.com";
	$.ajax({
		url : "heartRoom.do",
		type : "POST",
		data : {email : email},
		success : function (responseData){
			var data = JSON.parse(resonseData);
			console.log("찜목록 success: "+data.list.length);
		}
	});
});

//토큰 생성
var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");
$(function() {
	
    $(document).ajaxSend(function(e, xhr, options) {
        xhr.setRequestHeader(header, token);
    });
});

/////////////////////////////////////////////////////// 로그인 ///////////////////////

function showLogin(type){
	if(type==='1')
		$("#logA").click(); 
}

(function() { showLogin($("#whenFail").val()); }());
// 비번 중복 체크
$('#inputPw1').keyup(function(){
	if( $('#inputPw1').val() != $('#inputPw2').val()){
		$('#font2').text('');
		$('#font2').html('<b>비밀번호가 다릅니다</b>');
	}else{
		$('#font2').text('');
		$('#font2').text('비밀번호 확인 완료!');
	}
}); // InputPw1 keyup

$('#inputPw2').keyup(function(){
	if( $('#inputPw1').val() != $('#inputPw2').val()){
		$('#font2').text('');
		$('#font2').html('<b>비밀번호가 다릅니다</b>');
	}else{
		$('#font2').text('');
		$('#font2').text('비밀번호 확인 완료!');
	}
}); // InputPw2 keyu

// 로그인시 빈칸 확인 및 로그인시 이메일 & 비밀번호 확인
$("#logIn").click(function(){
	if( $("#input_email").val() === "" ){
		alert("이메일 주소가 비어있습니다. 적어 주세요.")
		return;
	}else if( $("#input_pw").val() === "" ){
		alert("비밀번호가 비어있습니다. 채워 주세요.")
		return;
	}
	$("#log").submit();
});

// 이메일 주소 중복 체크
$('#inputEmail').keyup(function(){
	
	$.ajax({
		type:'POST',
		url:'emCheck.do',
		data:{ mem_email : $("#inputEmail").val() },
		success : function(responseData){
			var data = responseData.email;
			
			if( $("#inputEmail").val() != data ){
				$('#font').text('');
				$('#font').html('<b> 중복되지 않습니다. 사용가능 합니다! </b>');
				$('#memInput').attr( 'disabled', false );
			}else if($("#inputEmail").val() === ""){
				$('#font').text('');
			}else{
				$('#font').text('');
				$('#font').text('중복 되는 이메일 입니다.');
				$('#memInput').attr( 'disabled', true );
				
			}
		}
	});
});

// inputEmail / inputPw1 / userName / phone / customCheck6 / customCheck7
//회원 가입시 확인 스크립트
$("#memInput").click(function(){
	if( $("#inputEmail").val() === "" ){
		alert(" 이메일을 입력해주세요.")
		return;
	}
	if( $("#inputPw1").val() === "" ){
		alert(" 비밀번호를 입력해주세요.")
		return;
	}
	if( $("#userName").val() === "" ){
		alert(" 이름을 입력해주세요.")
		return;
	}
	if( $("#phone").val() === "" ){
		alert(" 핸드폰 번호를 입력해주세요.")
		return;
	}
	if( $("input[name=customCheck6]").prop("checked") === false ){
		alert(" 이용약관에 확인 해주세요.")
		return;
	}
	if( $("input[name=customCheck7]").prop("checked") === false ){
		alert(" 개인정보 이용에 확인 해주세요.")
		return;
	}
	$("#memInsert").submit();
});



$(window).load(function() {    
    $('#loading').hide();  
});

var search_lat = 32.1;
var search_lng = 120.4;
var coords;
//검색할 때 입력한 글자만 진하게 나오는 부분
   $(function(){
   	
   	$.ui.autocomplete.prototype._renderItem = function (ul, item) {
   	    item.label = item.label.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + $.ui.autocomplete.escapeRegex(this.term) + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");
   	    return $("<li></li>")
   	            .data("item.autocomplete", item)
   	            .append("<a>" + item.label + "</a>")
   	            .appendTo(ul);
   	};
   	   	
   	//input 태그 id가 name
       $( "#address_search" ).autocomplete({
       	
           source : function( request, response ) {
        	   console.log("오토컴플릿 인입");
                $.ajax({
                       type: 'post',
                       url: "serchAuto.do",
                       dataType: "json",
                       //request.term = $("#autocomplete").val()
                       data: { "writer" : $("#address_search").val()},
                       //select * from BOARD where writer like %?%;
                       success: function(responseData) {
                       	var data = responseData;
                       	//console.log("오토컴플릿 인입: "+data[0].lat);
                       	$("#search_lat").val(data[0].lat)*1;
                        $("#search_lng").val(data[0].lng)*1;
                        search_lat = $("#search_lat").val()*1;
                        search_lng = $("#search_lng").val()*1;
                        coords = new daum.maps.LatLng(search_lat, search_lng);
                       	console.log("오토컴플릿 인입 lat: "+search_lat+", lng: "+search_lng);
                           //서버에서 json 데이터 response 후 목록에 뿌려주기 위함
                           response(
                               $.map(data, function(item) {
                               	//console.log(item);
                               	
   										 return {
   											label: item.address,
   											value: item.address 
 										 }                
                               })
                           );
                       }
                  });
               },
           //조회를 위한 최소글자수
           minLength: 2,
           select: function( event, ui ) {
        	   setTimeout( function() {	console.log("조회된 목록 선택 했을때 이벤트: "+$("#address_search").val()+", lat: "+search_lat+", lng: "+search_lng);
        	   							selectCheck();  
        	   							pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());
        	   							
        	   							map.setCenter(new daum.maps.LatLng(search_lat, search_lng));
        	   							
        	   }, 200);
        	   						
           }
       });

   });

   var search_address = "";
   function selectCheck(){
	   //console.log("selectCheck인입: "+$("#address_search").val());
	   search_address = $("#address_search").val();
	   $.ajax({
		   url : "searchAddress.do",
		   type : "POST",
		   data : {address : search_address},
		   success : function(responseData){
			   var data = responseData;
			   console.log("selectCheck인입 latlng1:"+data.lat+", lng:"+data.lng);
			   $("#search_lat").val(data.lat)*1;
               $("#search_lng").val(data.lng)*1;
               
               search_lat = $("#search_lat").val()*1;
               search_lng = $("#search_lng").val()*1;
               console.log("selectCheck인입 latlng2:"+search_lat+", lng:"+search_lng);
               $("#flag").val(0);
               map.setCenter(new daum.maps.LatLng(search_lat, search_lng));
               map.setLevel(12);
               setTimeout( function() { pageIndex(0, 1, $("#total").val(), $("#listCnt").val(), $("#pageCnt").val());  }, 500);
               map.setLevel(7);	
			   
		   }
	   });
   }




