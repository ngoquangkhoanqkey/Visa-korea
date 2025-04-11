/* 개발 중에 JS를 추가하거나 수정해야 하는 상황에는 해당 파일에 정의해주시기 바랍니다. */

$(document).on('ready', function() {
    // 메인페이지와 사전예약 신청 페이지에 있는 달력
    $("#book__calendar").datepicker({
        dateFormat: "yy-mm-dd",
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        minDate:'+1',
        yearSuffix: "년",
        showMonthAfterYear: true,
        constrainInput: false,
        beforeShowDay: $.datepicker.noWeekends,
        beforeShow: function(elem, obj) {
            if ( $('#' + obj.id).attr('date-min') ) {
                $(this).datepicker('option', 'minDate', $('#' + obj.id).attr('date-min'));
            } else {
                $(this).datepicker('option', 'minDate', '+1');
            }            
        }
    });

    $("#calendar").datepicker({
        
    });

    // Textfield를 클릭했을 때 생성되는 달력
    $('.-datepicker').datepicker({
        dateFormat: "yy-mm-dd",
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        yearSuffix: "년",
        showMonthAfterYear: true
    });
});
