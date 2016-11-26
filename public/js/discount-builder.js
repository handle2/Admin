$('input[name="type"]').change(function () {
    setDiscountInputs()
});

$( document ).ready(function() {
    setDiscountInputs();
});

function setDiscountInputs() {
    $('.type').css({
        visibility: 'hidden',
        position: 'absolute'
    });
    $('.'+$('input[name="type"]:checked').val()).css({
        visibility: 'visible',
        position: 'relative'
    });
}