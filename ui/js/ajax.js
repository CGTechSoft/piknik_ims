function ajax(url, type, data, responceHandler) {
    enable_spinner();    
        console.log("Loadin URL : " + url);
        if(type=='POST'){
            console.dir(data);
        }
    $.ajax({
        url: url,
        type: type,
        data: data,
        success: function(html) {
            disable_spinner();
            var responce = $.parseJSON(html);
            console.dir(responce);
            responceHandler(responce);
        },
        error: function(html) {
            disable_spinner();
            console.log(html);
            alert('Error occured');
        }
    });
}
function is_loged_in(success_handler, failure_handler) {
    ajax('../controller/api/is_logged_in.php', 'GET', '', function(responce) {
        if (responce.status === 'success') {
            success_handler(responce.data.user);
        } else {
            failure_handler();
        }
    });

}
function logout(success_handler, failure_handler) {
    ajax('../controller/api/logout.php', 'GET', '', function(responce) {
        if (responce.status === 'success') {
            success_handler();
        } else {
            failure_handler(responce.error);
        }
    });

}

function login(user_name, password, success_handler, failure_handler) {
    var data = {
        user_name:user_name,
        password :password
    }
    ajax('../controller/api/login.php', 'POST', data, function(responce) {
        if (responce.status === 'success') {
            success_handler(responce.data.user);
        } else {
            failure_handler(responce.error);
        }
    });
}

function get_menu_items(success_handler, failure_handler){
    ajax('../controller/api/menu_list.php', 'GET', '', function(responce) {
        if (responce.status === 'success') {    
            success_handler(responce.data);
        } else {
            failure_handler(responce.error);
        }
    });
}

function get_form(menu_item_id, success_handler, failure_handler){
    var data = {
        menu_item_id:menu_item_id
    }
    ajax('../controller/api/get_form.php', 'POST', data, function(responce) {
        if (responce.status === 'success') {    
            success_handler(responce.data.form, responce.data.tools);
        } else {
            failure_handler(responce.error);
        }
    });
}

function add_form_data(data, success_handler, failure_handler){
    ajax('../controller/api/add_form_data.php', 'POST', data, function(responce) {
        if (responce.status === 'success') {    
            success_handler(responce.data.message, responce.data.id);
        } else {
            failure_handler(responce.error);
        }
    });
}

function update_form_data(data, success_handler, failure_handler){
    ajax('../controller/api/update_form_data.php', 'POST', data, function(responce) {
        if (responce.status === 'success') {    
            success_handler(responce.data.message, responce.data.id);
        } else {
            failure_handler(responce.error);
        }
    });
}

function add_purchace_to_stock(data, success_handler, failure_handler){
    ajax('../controller/api/add_to_stock.php', 'POST', data, function(responce) {
        if (responce.status === 'success') {    
            success_handler(responce.data.message);
        } else {
            failure_handler(responce.error);
        }
    });
}

function enable_spinner() {
        console.log('enabling spinner');
    $('div#spinner-wraper').css({'display': 'block'});
}
function disable_spinner() {
        console.log('disabling spinner');
    $('div#spinner-wraper').css({'display': 'none'});
}