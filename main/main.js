$(document).ready(function () {
    var word = []; // word array
    var meaning = []; // meaning array
    var table = document.getElementsByTagName("td");
    var show_index = 0;
    // 0: show_entire
    // 1: show_word
    // 2: show_meaning

    var page_index = 1;
    var total_index = 0;
    var txt_number = 1;
    var tt = [];

    const basePath = '../voca/page';
    const fileExtension = '.txt';

    function fetchFile(txt_number) {
        const filePath = `${basePath}${txt_number}${fileExtension}`;

        $.ajax({
            url: filePath,
            dataType: 'text',
            success: function (data) {
                var tmp_str = "";
                tt.push(data);

                for (const index of data) {
                    if (index == '\t') {
                        word.push(tmp_str);
                        tmp_str = "";
                    } else if (index == '\n') {
                        tmp_str = tmp_str.substr(0, tmp_str.length - 1);
                        meaning.push(tmp_str);
                        tmp_str = "";
                    } else
                        tmp_str += index;
                }
                meaning.push(tmp_str);
                tmp_str = "";
                console.log(`Content of ${filePath}:`);
                // 다음 파일을 시도
                txt_number++;
                fetchFile(txt_number);
            },
            error: function (xhr, status, error) {
                console.error(`Error loading ${filePath}:`, error);
                // 파일이 존재하지 않으면 루프 중단
                if (xhr.status === 404) {
                    console.log('No more files to fetch.');
                    total_index = Math.ceil(word.length / 10);
                    updatePageNumber();
                    update_table();
                }
            }

        });

    }

    // initialize page, update page
    function updatePageNumber() {
        const page_number = document.getElementById("page_factor");
        var str = "";
        if (page_index < 10)
            str += "0" + page_index.toString();
        else
            str += page_index.toString();
        str += " / ";
        if (total_index < 10)
            str += "0" + total_index.toString();
        else
            str += total_index.toString();
        page_number.innerText = str;
    }

    // add event to button
    document.getElementById("right_arrow").addEventListener("click", page_up);
    document.getElementById("left_arrow").addEventListener("click", page_down);
    document.getElementById("show_entire_button").addEventListener("click", show_entire);
    document.getElementById("show_word_button").addEventListener("click", show_word);
    document.getElementById("show_meaning_button").addEventListener("click", show_meaning);
    document.getElementById("refresh_button").addEventListener("click", refresh);


    function page_up() {
        if (page_index < total_index)
            page_index++;
        else
            page_index = 1;
        updatePageNumber();
        update_table();
    }

    function page_down() {
        if (page_index > 1)
            page_index--;
        else
            page_index = total_index;
        updatePageNumber();
        update_table();
    }

    function update_table() {
        if (show_index == 0)
            show_entire();
        if (show_index == 1)
            show_word();
        if (show_index == 2)
            show_meaning();
    }

    function show_entire() {
        show_index = 0;
        for (var index = 0; index < table.length; index++) {
            if (index % 2 == 0) {
                if ((page_index - 1) * 10 + index / 2 < word.length)
                    table[index].innerText = word[(page_index - 1) * 10 + index / 2];
                else
                    table[index].innerText = "";
            } else {
                if ((page_index - 1) * 10 + index / 2 < word.length)
                    table[index].innerText = meaning[(page_index - 1) * 10 + ((index - 1) / 2)];
                else
                    table[index].innerText = "";
            }
        }
    }

    function show_word() {
        show_index = 1;
        for (var index = 0; index < table.length; index++) {
            if (index % 2 == 0) {
                if ((page_index - 1) * 10 + index / 2 < word.length)
                    table[index].innerText = word[(page_index - 1) * 10 + index / 2];
                else
                    table[index].innerText = "";
            } else
                table[index].innerText = "";
        }
    }

    function show_meaning() {
        show_index = 2;
        for (var index = 0; index < table.length; index++) {
            if (index % 2 == 0)
                table[index].innerText = "";
            else {
                if ((page_index - 1) * 10 + index / 2 < word.length)
                    table[index].innerText = meaning[(page_index - 1) * 10 + ((index - 1) / 2)];
                else
                    table[index].innerText = "";
            }
        }
    }

    function refresh() {
        window.location.reload();
    }

    // 첫 번째 파일부터 시작
    fetchFile(txt_number);
    //console.log(tt);
    //console.log(word);
    //console.log(meaning);
});