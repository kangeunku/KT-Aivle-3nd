
function send(data, state, callback='empty'){
    // csrf 토큰 찾아주는 함수
    const csrftoken = getCookie('csrftoken');
    // 콜백시 실행할 함수  
    $.ajax({
        headers: {'X-CSRFToken': csrftoken},
        url: 'send',
        type: 'POST',
        data: {
            'data': data, // 보낼 데이터
            'state': state, // 뷰단에서 처리할 함수
            'callback': callback // 뷰에서 처리하고 돌아오는 함수
        },
        datatype: 'json', // 서버에서 반환되는 데이터 json 형식
        success: function(data){ 
            callback = data.callback;
            result = data.data;
            const fun_dict = {
                'empty': console.log,
                'temp_func': temp_func,
            }
            fun_dict[callback](result)
        }
    });
}

function temp_func(data){
    html = `
        <li>
            <strong class="gpt_question">Q : ${data.question} </strong>
            <p class="gpt_answer">A : {{__change__}} </p>
        </li>
    `;
    html = html.replace('{{__change__}}', data.answer)
    $('.answer_list').prepend(html)
    console.log(data)
}

// 쿠키에서 csrf 토큰
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}