var questList = new Array();
var resultList = new Array();
var singleQuestIdx = -1;
var multiQuestIdx = 0;
var generateIdList = new Array();

function refresh_quest(){
	//document.location.reload();
	execLoadElement();
}

function validateAndCheck(type){
	$("#score_area").html('');
	var singleCountMaxNum = 30;
	var multipleCountMaxNum = 15;
	if(type == 'S'){
		var singleCountNum = $("#singleCount").val();
		if(singleCountNum > singleCountMaxNum){
			alert("单选题数目不能超过"+singleCountMaxNum+"道");
			singleCountNum = singleCountMaxNum;
		}
		multipleCountNum = Math.floor(singleCountNum/2);
	}else if(type == 'M'){
		var multipleCountNum = $("#multipleCount").val();
		if(multipleCountNum > multipleCountMaxNum){
			alert("多选题数目不能超过"+multipleCountMaxNum+"道");
			multipleCountNum = multipleCountMaxNum;
		}
		singleCountNum = multipleCountNum*2;
	}
	
	$("#singleCount").val(singleCountNum);
	$("#multipleCount").val(multipleCountNum);
	execLoadElement();
}

function processNext(object){
	var items = object.value.split('_');
	var series_idx = items[0];
	var quest_idx = items[1];
	var answer_idx = items[2];
	
	var quest = new Object();
	quest.idx = quest_idx;
	quest.answer = answer_idx;
	
	resultLis[series_idx] = quest;
}

function transformAnswer(answerLetter, type){
	if(type == 'S'){
		if(answerLetter == 'A'){
			return '0';
		}else if(answerLetter == 'B'){
			return '1';
		}else if(answerLetter == 'C'){
			return '2';
		}else if(answerLetter == 'D'){
			return '3';
		}
	}else if(type == 'M'){
		var combined_answer = "";
		var items = answerLetter.split("");
		
		$.each(items, function(index, value) {
			if(value == 'A'){
				combined_answer += '0';
			}else if(value == 'B'){
				combined_answer += '1';
			}else if(value == 'C'){
				combined_answer += '2';
			}else if(value == 'D'){
				combined_answer += '3';
			}
		});
		
		return combined_answer;
	}
}

function collect_result(){
	var check_answer_array = new Array();
	var singleCountNum = $("#singleCount").val();
	var multipleCountNum = $("#multipleCount").val();
	
	$("input:radio").each(function() {
		var items = $(this).val().split('_');
		
		var series_idx = items[0];
		var quest_idx = items[1];
		var answer_idx = items[2];
		
		if(check_answer_array[quest_idx] == null) {
			check_answer_array[quest_idx] = new Object();
			check_answer_array[quest_idx].quest_idx = quest_idx;
			check_answer_array[quest_idx].type = 'S';
			check_answer_array[quest_idx].answer_idx = "";
			check_answer_array[quest_idx].unchecked_idx = "";
		}
		if($(this).is(':checked')) {
			check_answer_array[quest_idx].answer_idx += answer_idx;
		}else {
			check_answer_array[quest_idx].unchecked_idx += answer_idx;
		}
    });
	
	
	//collect checked items
	$("input:checkbox").each(function() {
		var items = $(this).val().split('_');
		
		var series_idx = items[0];
		var quest_idx = items[1];
		var answer_idx = items[2];
		
		if(check_answer_array[quest_idx] == null) {
			check_answer_array[quest_idx] = new Object();
			check_answer_array[quest_idx].quest_idx = quest_idx;
			check_answer_array[quest_idx].type = 'M';
			check_answer_array[quest_idx].answer_idx = "";
			check_answer_array[quest_idx].unchecked_idx = "";
		}
		if($(this).is(':checked')) {
			check_answer_array[quest_idx].answer_idx += answer_idx;
		}else {
			check_answer_array[quest_idx].unchecked_idx += answer_idx;
		}
    });
	
	var score = 0;
	//compare and show the result
	$.each(check_answer_array, function(index, value) {
		if(value != null){
			var quest_idx = value.quest_idx;
			var correct_answer_letter = questList[value.quest_idx].answer;
			var type = value.type;
			//alert(value.quest_idx + "=" + value.type + "=" + value.answer_idx + "=" + value.unchecked_idx);
			if(transformAnswer(correct_answer_letter,type) != value.answer_idx || value.unchecked_idx == '0123'){
				$("#hint_"+quest_idx).css("color","red")
				$("#hint_"+quest_idx).html("错误, 正确答案为:" + correct_answer_letter);
				$("#hint_"+quest_idx).show();
			}else {
				$("#hint_"+quest_idx).css("color","green")
				$("#hint_"+quest_idx).html("正确.");
				$("#hint_"+quest_idx).show();
				//calculate score
				if(type == 'S'){
					score += (60/singleCountNum); 
				}else if(type == 'M'){
					score += (40/multipleCountNum); 
				}
			}
		}
	});
	
	score = Math.ceil(score);
	
	$("#score_area").html("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; >>>> 您的得分为:" + score);
	if(score >= 60){
		$("#score_area").css("color","green");
	}else {
		$("#score_area").css("color","red");
	}
	
	returnToTop();
}

function returnToTop(){
	$("html,body").animate({scrollTop: $("#top_anchor").offset().top}, 150);
}

function fillHTML(quest,seriesid){
	var questStrLine = "";
		
	questStrLine += "<div class='r-qu-body'>";
	questStrLine += "<div class='r-qu-body-title'>";
	if(quest.type == 'S'){
		questStrLine += "" + (seriesid + 1) + "、<p>"+quest.content+"</p>[单选题]";
	}else {
		questStrLine += "" + (seriesid + 1) + "、<p>"+quest.content+"</p>[多选题]";
	}
		
	questStrLine += "</div>";
	questStrLine += "<div class='r-qu-body-content'>";
	questStrLine += "<ul class='r-qu-body-ul1'>";
	
	$.each(quest.optionList, function(index, value) {
		questStrLine += "<li><ul class='quItem-ul'>";
		
		if(quest.type == 'S'){
			questStrLine += "<li><input type='radio' name='radio_"+quest.idx+"' value='"+seriesid+"_"+quest.idx+"_"+index+"' /></li>";
		}else {
			questStrLine += "<li><input type='checkbox' name='checkbox_"+quest.idx+"' value='"+seriesid+"_"+quest.idx+"_"+index+"' /></li>";
		}
		
		questStrLine += "<li class='quItemOptionName rd_ck'><p>"+value+"</p></li>";
		questStrLine += "</ul></li>";
	});
	
	//hint area
	questStrLine += "<li id='hint_"+quest.idx+"' style='display:none'></li>";
	
	questStrLine += "</ul>";
	questStrLine += "<div style='clear: both;'></div>";
	questStrLine += "<div class='quItemNote'></div>";
	questStrLine += "</div>";
	questStrLine += "</div>";
	
	$("#quest_content_id").append(questStrLine);
}

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function execLoadElement(){
	//alert(singleQuestIdx + "=" + multiQuestIdx);
	$("#quest_content_id").html('');
	var singleCountNum = $("#singleCount").val();
	var multipleCountNum = $("#multipleCount").val();
	var seriesid = 0;
	
	//generate 20 single question
	for(var i=0;i<singleCountNum;i++){
		var generateId;
		while(true){
			generateId = getRandomInt(0, singleQuestIdx);
			if(generateIdList[generateId] == null){
				generateIdList[generateId] = generateId;
				break;
			}
		}
		fillHTML(questList[generateId],seriesid);
		seriesid++;
	}
	//generate 10 multiple question
	for(var i=0;i<multipleCountNum;i++){
		var generateId;
		while(true){
			generateId = getRandomInt(singleQuestIdx+1, multiQuestIdx);
			if(generateIdList[generateId] == null){
				generateIdList[generateId] = generateId;
				break;
			}
		}
		fillHTML(questList[generateId],seriesid);
		seriesid++;
	}
	
	returnToTop();
}

function initalLoginFunc () {
	var national_id = $( "#national_id" ),
		allFields = $( [] ).add( name ),
		tips = $( ".validateTips" );

	function updateTips( t ) {
		tips
			.text( t )
			.addClass( "ui-state-highlight" );
		setTimeout(function() {
			tips.removeClass( "ui-state-highlight", 1500 );
		}, 500 );
	}

	function checkLength( o, n, min, max ) {
		if ( o.val().length > max || o.val().length < min ) {
			o.addClass( "ui-state-error" );
			updateTips( n + "的长度必须在" +
				min + "到" + max + "之间." );
			return false;
		} else {
			return true;
		}
	}
	
	$( "#dialog-form" ).dialog({
		autoOpen: false,
		height: 250,
		width: 400,
		modal: true,
		buttons: {
			"确定": function() {
				var bValid = true;
				allFields.removeClass( "ui-state-error" );

				bValid = bValid && checkLength( national_id, "身份证号码", 18, 18);
				
				//bValid = bValid && checkRegexp( name, /^[a-z]([0-9a-z_])+$/i, "Username may consist of a-z, 0-9, underscores, begin with a letter." );

				if ( bValid ) {
					alert('');
					
					//ajax
					
					
					
					$( "#users tbody" ).append( "<tr>" +
						"<td>" + name.val() + "</td>" +
						"<td>" + email.val() + "</td>" +
						"<td>" + password.val() + "</td>" +
					"</tr>" );
					$( this ).dialog( "close" );
				}
			},
			"取消": function() {
				$( this ).dialog( "close" );
			}
		},
		close: function() {
			allFields.val( "" ).removeClass( "ui-state-error" );
		}
	});
	
	$( "#loginButton" ).click(function() {
		$( "#dialog-form" ).dialog( "open" );
	});
}

$(document).ready(
		function() {
			function readTextFile(quest_type) {
				var rawTxt = "";
				if(quest_type == 'S'){
					rawTxt = loadSingleQuestFunc();
				}else if(quest_type == 'M') {
					rawTxt = loadMultipleQuestFunc();
				}
				var line = rawTxt.split('$');
				$.each(line, function(index, value) {
					var items = value.split('|');
					var quest = new Object();
					quest.idx = questList.length;
					quest.type = items[0];
					quest.content = items[1];
					quest.answer = items[2];
					
					var optionList = new Array();
					
					optionList.push(items[3]);
					optionList.push(items[4]);
					optionList.push(items[5]);
					optionList.push(items[6]);
					
					quest.optionList = optionList;
					
					questList.push(quest);
					
					if(quest_type == 'S'){
						singleQuestIdx++;
					}else if (quest_type == 'M'){
						if(multiQuestIdx == 0) {
							multiQuestIdx = singleQuestIdx + 1;
						}else {
							multiQuestIdx++;
						}
					}
				});

			}
			
			readTextFile("S");
			readTextFile("M");
			execLoadElement();
			initalLoginFunc();
			
		}
);

