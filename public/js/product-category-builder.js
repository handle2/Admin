var darab = 0;
var inputs = $(".inputs");

$('.add').click(function () {

    darab++;

    var radios =
        "<div class='stuff'>" +
        "<label class='checkbox-inline'><input type='radio' value='text' name='radio_"+darab+"'>Text</label>" +
        "<label class='checkbox-inline'><input type='radio' value='textarea' name='radio_"+darab+"'>Textarea</label>" +
        "<label class='checkbox-inline'><input type='radio' value='radio' name='radio_"+darab+"'>Radio</label>" +
        "<label class='checkbox-inline'><input type='radio' value='checkbox' name='radio_"+darab+"'>Checkbox</label>" +
        "<label class='checkbox-inline'><input type='radio' value='number' name='radio_"+darab+"'>Number</label>" +
        "<label class='checkbox-inline'><input type='radio' value='email' name='radio_"+darab+"'>Email</label>" +
        "<div class='remove'>-</div>" +
        "<div id='radio_"+darab+"'></div>" +
        "</div>";

    inputs.append(radios);
    $("input[name='count']").val($('.stuff').length);
});

inputs.on("click", ".remove", function () {
    $(this).parent().remove();
    $("input[name='count']").val($('.stuff').length);
});

inputs.on("click", ".add_radio", function () {
    var length = $(this).parent().find('.radio_child').length;

    var radio_attr = "<input class='radio_child' type='text' placeholder='"+(length+1)+". radiobutton név' name='"+$(this).parent().attr('id')+"_item_"+length+"'><br/>";

    $(this).parent().append(radio_attr);
});

inputs.on("click", ".add_checkbox", function () {

    var length = $(this).parent().find('.checkbox_child').length;

    var checkbox_attr = "<input class='checkbox_child' type='text' placeholder='"+(length+1)+". checkbox név' name='"+$(this).parent().attr('id')+"_item_"+length+"'><br/>";

    $(this).parent().append(checkbox_attr);
});

inputs.on("change", ":radio", function () {

    var name = $(this).attr('name');

    var actual = $('#'+name);

    actual.empty();

    switch($(this).val()) {
        case 'text':
            var text_input =
                "Text attributumok<br/><input type='text' name='"+name+"_text.name' placeholder='name'><br/>" +
                "<input type='number' name='"+name+"_text.length' placeholder='length'><br/>";
            actual.append(text_input);
            break;
        case 'textarea':
            var textarea_input =
                "Textarea attributumok<br/><input type='text' name='"+name+"_textarea.name' placeholder='name'><br/>"+
                "<input type='number' name='"+name+"_text.length' placeholder='length'><br/>";
            actual.append(textarea_input);
            break;
        case 'radio':
            var radio_input =
                "Radio attributumok<br/><input type='text' name='"+name+"_radio.name' placeholder='name'><br/>" +
                "<div class='add_radio'>+</div>";
            actual.append(radio_input);
            break;
        case 'checkbox':
            var checkbox_input =
                "Checkbox attributumok<br/><input type='text' name='"+name+"_checkbox.name' placeholder='name'><br/>" +
                "<div class='add_checkbox'>+</div>";
            actual.append(checkbox_input);
            break;
        case 'number':
            var number_input =
                "Number attributumok<br/><input type='text' name='"+name+"_number.name' placeholder='name'><br/>"+
                "<input type='number' name='"+name+"_text.length' placeholder='length'>";
            actual.append(number_input);
            break;
        case 'email':
            var email_input =
                "Email attributumok<br/><input type='text' name='"+name+"_number.email' placeholder='name'><br/>";
            actual.append(email_input);
            break;
        default:
    }
});
$(document).ready(function () {
    $.each( $('.ex_inputs p'), function( key, value ) {
        if(!$(this).hasClass('active')){
            $(this).addClass('active');
            $(this).trigger( "click" );
        }
    });


});
$('.ex_inputs').on("click", "p", function () {
    var id = $(this).attr('data');
    if($(this).hasClass('active')){
        $.post( "/admin/productcateg/getinput", { id : id } ).success(function (data) {
            data = JSON.parse(data);
           // console.log(data);
            darab++;
            var text = data.type=='text'?'checked':'';
            var textarea = data.type=='textarea'?'checked':'';
            var radio = data.type=='radio'?'checked':'';
            var checkbox = data.type=='checkbox'?'checked':'';
            var number = data.type=='number'?'checked':'';
            var email = data.type=='email'?'checked':'';
            var radios =
                "<div class='stuff' id='"+data._id.$id+"'>" +
                "<label class='checkbox-inline'><input type='radio' name='radio_"+darab+"' value='exsist' disabled='disabled' "+text+">Text</label>" +
                "<label class='checkbox-inline'><input type='radio' name='radio_"+darab+"' value='exsist' disabled='disabled' "+textarea+">Textarea</label>" +
                "<label class='checkbox-inline'><input type='radio' name='radio_"+darab+"' value='exsist' disabled='disabled' "+radio+">Radio</label>" +
                "<label class='checkbox-inline'><input type='radio' name='radio_"+darab+"' value='exsist' disabled='disabled' "+checkbox+">Checkbox</label>" +
                "<label class='checkbox-inline'><input type='radio' name='radio_"+darab+"' value='exsist' disabled='disabled' "+number+">Number</label>" +
                "<label class='checkbox-inline'><input type='radio' name='radio_"+darab+"' value='exsist' disabled='disabled' "+email+">Email</label>" +
                "<input type='hidden' name='radio_"+darab+"' value='exsist'>"+
                "<input type='hidden' name='radio_"+darab+"_id' value='"+data._id.$id+"'>"+
                "<div class='"+data._id.$id+"'></div>"
            "</div>";

            inputs.append(radios);
            $("input[name='count']").val($('.stuff').length);
            var actual = $('.'+data._id.$id);
            switch (data.type){
                case 'text':
                    var text_input =
                        "Text attributumok<br/><input type='text' value='"+data.name+"' disabled><br/>" +
                        "<input type='number' value='"+data.length+"' disabled><br/>";
                    actual.append(text_input);
                    break;
                case 'textarea':
                    var textarea_input =
                        "Textarea attributumok<br/><input type='text' value='"+data.name+"' disabled><br/>"+
                        "<input type='number' value='"+data.length+"' disabled><br/>";
                    actual.append(textarea_input);
                    break;
                case 'radio':
                    var radio_input =
                        "Radio attributumok<br/><input type='text' value='"+data.name+"' disabled><br/>";
                    actual.append(radio_input+"children<br/>");
                    for(var i = 0;i<data.item.length;i++){
                        actual.append("<input type='text' disabled value='"+data.item[i]+"'><br/>");
                    }
                    break;
                case 'checkbox':
                    var checkbox_input =
                        "Checkbox attributumok<br/><input type='text' value='"+data.name+"' disabled><br/>";
                    actual.append(checkbox_input+"children<br/>");
                    for(var i = 0;i<data.item.length;i++){
                        actual.append("<input type='text' disabled value='"+data.item[i]+"'><br/>");
                    }
                    break;
                case 'number':
                    var number_input =
                        "Number attributumok<br/><input type='text' value='"+data.name+"' disabled ><br/>"+
                        "<input type='number' value='"+data.length+"' disabled>";
                    actual.append(number_input);
                    break;
                case 'email':
                    var email_input =
                        "Email attributumok<br/><input type='text' value='"+data.name+"' disabled><br/>";
                    actual.append(email_input);
                    break;
                default:
            }
        });
        $(this).removeClass('active');
    }else{
        darab--;
        $("[id="+id+"]").remove();
        $(this).addClass('active');
        $("input[name='count']").val($('.stuff').length);
    }
});