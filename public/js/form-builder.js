$( document ).ready(function() {
    generateForm();
});

$('input[name=categ]').change(function () {
    generateForm();
});

function generateForm() {
    $('.generated').empty();
    var url = $('input[name=categ]:checked').val();
    $.post( "/admin/product/getproduct", { url : url } ).success(function (data) {
        var categ = JSON.parse(data);
        $.each( categ.inputs, function( key, value ) {
            $.post( "/admin/productcateg/getinput", { id : value.$id } ).success(function (input) {
                var cell = JSON.parse(input);
                var val = $('.'+cell.url).attr('data')?$('.'+cell.url).attr('data'):'';
                switch (cell.type){
                    case 'text':
                        var text =
                            "<div class='form-group'>" +
                            "<label for='"+cell.type+"'>"+cell.name+":</label>" +
                            "<input type='"+cell.type+"' value='"+val+"' maxlength='"+cell.length+"' class='form-control' name='"+cell.url+"'>"+
                            "</div>";
                        $('.generated').append(text);
                        break;
                    case 'textarea':
                        var textarea =
                            "<div class='form-group'>" +
                            "<label for='"+cell.type+"'>"+cell.name+":</label>" +
                            "<textarea class='form-control' maxlength='"+cell.length+"' name='"+cell.url+"'>"+val+"</textarea>"+
                            "</div>";
                        $('.generated').append(textarea);
                        break;
                    case 'radio':
                        var radio =
                            "<div class='form-group'>"+
                            "<label for='"+cell.type+"'>"+cell.name+":</label><br/>";
                        for(var i = 0;i<cell.item.length;i++){
                            if(cell.item_url[i] == val){
                                radio += "<label class='radio-inline'><input type='"+cell.type+"' name='"+cell.url+"' checked value='"+cell.item_url[i]+"'>"+cell.item[i]+"</label>";
                            }else {
                                radio += "<label class='radio-inline'><input type='" + cell.type + "' name='" + cell.url + "' value='" + cell.item_url[i] + "'>" + cell.item[i] + "</label>";
                            }
                        }
                        radio += "</div>";
                        $('.generated').append(radio);
                        break;
                    case 'checkbox':
                        if(val!=''){
                            var vals = JSON.parse(val);
                        }
                        var checkbox =
                            "<div class='form-group'>"+
                            "<label for='"+cell.type+"'>"+cell.name+":</label><br/>";
                        for(var i = 0;i<cell.item.length;i++){
                            if(val!='' && $.inArray(cell.item_url[i],vals)){
                                checkbox += "<label class='checkbox-inline'><input type='"+cell.type+"' checked name='"+cell.url+"[]' value='"+cell.item_url[i]+"'>"+cell.item[i]+"</label>";
                            }else{
                                checkbox += "<label class='checkbox-inline'><input type='"+cell.type+"' name='"+cell.url+"[]' value='"+cell.item_url[i]+"'>"+cell.item[i]+"</label>";
                            }
                        }
                        checkbox += "</div>";
                        $('.generated').append(checkbox);
                        break;
                    case 'number':
                        var number =
                            "<div class='form-group'>" +
                            "<label for='"+cell.type+"'>"+cell.name+":</label>" +
                            "<input type='"+cell.type+"' value='"+val+"' max='"+cell.length+"' class='form-control' name='"+cell.url+"'>"+
                            "</div>";
                        $('.generated').append(number);
                        break;
                    case 'email':
                        var email =
                            "<div class='form-group'>" +
                            "<label for='"+cell.type+"'>"+cell.name+":</label>" +
                            "<input type='"+cell.type+"' class='form-control' value='"+val+"' name='"+cell.url+"'>"+
                            "</div>";
                        $('.generated').append(email);
                        break;
                }
            });
        });
    });
}