// A törlésnél visszakérdez a modal
$('.confirm-link').on('click', function(e) {
    e.preventDefault()
    var link = $(this).data('link');
    $('#myModal').data('link',link);
});

// Ha igen akkor átirányít a törlés linkre
$('#btnYes').click(function() {
    // handle redirect here
    var link = $('#myModal').data('link');
    location.href = link;
    $('#myModal').modal('hide');
});

// A bootstrap checkboxok szebbek lesznek
$(function(argument) {
    $('[type="checkbox"]').bootstrapSwitch();
});

// Notificationok fadelése
$("#notification").fadeIn("slow");

$("#notification").delay(2500).fadeOut("slow");

// #iamge kép feltöltésnél megjelenik benne  akép
$('#image').hide();
$('#jcrop-preview').hide();

function readURL(input) {
    if (input) {
        var reader = new FileReader();

        reader.onload = function (e) { //jcrop-preview
            $('#image').attr('src', e.target.result);
            //$('#jcrop-preview').attr('src', e.target.result);
            $('#dropzone p').hide();
            $('#image').show();
            //$('#jcrop-preview').show();
        }

        reader.readAsDataURL(input);
    }
}

// contenteknél itt dobja össze az inputokat
function setInputs(){
    var type = $( "input[name='type']:checked").val();
    //todo kell írni egy apit ami lekéri adatbázisból a kellő jogokat és itt beállítja
    if(type == 'menu'){
        $('#parent').hide();
    }
    else if(type == 'content'){
        $('#parent').show();
    }
}

$( document ).ready(function() {
    setInputs();
});

$( "input[name='type']").change(function(){
    setInputs();
});


// scrollbar
$('#inner').enscroll({
    showOnHover: false,
    verticalTrackClass: 'track3',
    verticalHandleClass: 'handle3'
});

//dropzone
(function () {
    var dropzone = $('#dropzone');

    function createThumbs(files) {


        for(var i=0;i<files.length;i++){
            var reader = new FileReader();

            reader.onload = function (e) { //jcrop-preview
                $('.thumbs').append('<img class="thumb" src="'+ e.target.result+'">');
            }
            reader.readAsDataURL(files[i]);
        }
    }
    function upload(files) {
        var formData = new FormData();
        readURL(files[0]);
        for(var x = 0;x<files.length;x++){
            //létrehozza a cuccost amit fel akaruk tölteni
            formData.append('file[]',files[x]);
        }
    }

    dropzone.on('dragover',function () {
        $(this).addClass('dragover');
        return false;
    });

    dropzone.on('dragleave',function () {
        $(this).removeClass('dragover');
        return false;
    });

    dropzone.on('drop',function (e) {
        e.preventDefault();
        $(this).removeClass('dragover');
        $(this).addClass('dropped');
        upload(e.originalEvent.dataTransfer.files);
        
        return false;
    });

    dropzone.on('click',function () {
        if(!$(this).hasClass('dropped')){
            $('input[type=file]').trigger('click');
        }
    });

    $('input[type=file]').change(function(e){
        createThumbs(this.files);
        dropzone.addClass('dropped');
        readURL(this.files[0]);
    });

    dropzone.find('img').each(function(){
        var imgClass = (this.width/this.height > 1) ? 'wide' : 'tall';
        $(this).addClass(imgClass);
    });

}());
function jcropApi() {
    var jcrop_api,
        boundx,
        boundy,

        // Grab some information about the preview pane
        $preview = $('#preview-pane'),
        $pcnt = $('#preview-pane .preview-container'),
        $pimg = $('#preview-pane .preview-container img'),

        xsize = $pcnt.width(),
        ysize = $pcnt.height();

    console.log('init',[xsize,ysize]);
    $('#image').Jcrop({
      onChange: updatePreview,
      onSelect: updatePreview,
      aspectRatio: xsize / ysize
    },function(){
      // Use the API to get the real image size
      var bounds = this.getBounds();
      boundx = bounds[0];
      boundy = bounds[1];
      // Store the API in the jcrop_api variable
      jcrop_api = this;

      // Move the preview into the jcrop container for css positioning
      $preview.appendTo(jcrop_api.ui.holder);
    });

    function updatePreview(c)
    {
      if (parseInt(c.w) > 0)
      {
        var rx = xsize / c.w;
        var ry = ysize / c.h;

        $pimg.css({
          width: Math.round(rx * boundx) + 'px',
          height: Math.round(ry * boundy) + 'px',
          marginLeft: '-' + Math.round(rx * c.x) + 'px',
          marginTop: '-' + Math.round(ry * c.y) + 'px'
        });
      }
    };
}
$(function () {
    $('#popover').popover({
        trigger: "hover",
        placement: 'left'
    });
});