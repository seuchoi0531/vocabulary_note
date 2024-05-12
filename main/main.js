$(document).ready(function () {
    var word = []; // word array
    var meaning = []; // meaning array
    var show_index = 0;
    // 0: show_entire
    // 1: show_word
    // 2: show_meaning
    var page_index = 1;
    var total_index = 0;
    var file_number = 0;
    function readFile(FILE_ELEMENT, CALLBACK) {
        const reader = new FileReader();
        reader.onload = function () {
            CALLBACK(reader.result);
        }
        reader.readAsText(FILE_ELEMENT.files[0], "EUC-KR");
    }
    readFile("page1.txt", console.log);
    //파일 개수 구하기
    //page1.txt, page2.txt, ... 형식이므로, 
    //"page" + i + ".txt"가 없을 때까지 하면 됨
});