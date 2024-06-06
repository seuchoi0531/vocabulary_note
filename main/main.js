$(document).ready(function() {
    var word = []; // word array
    var meaning = []; // meaning array
    var show_index = 0;
    // 0: show_entire
    // 1: show_word
    // 2: show_meaning
    var page_index = 1;
    var total_index = 0;
    var file_number = 0;
    
    $.ajax({
        url: '../voca/page1.txt', // 파일의 경로
        dataType: 'text',
        success: function(data) {
            console.log(data);
        },
        error: function(xhr, status, error) {
            console.error('Error:', error);
        }
    });
});