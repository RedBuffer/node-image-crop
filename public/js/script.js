var uploadedImage = {};
var imagePath;

$(function(){
    // Profile Photo upload
    $("#file_obj").change(function(){
        readURL(this);
    });
    var thumb = $(".thumbnails");
    $('#thumbnail').imgAreaSelect({ aspectRatio: '1:1', onSelectChange: preview});
    $('#save_thumb').click(function() {
        var x1 = $('#x1').val();
        var y1 = $('#y1').val();
        var x2 = $('#x2').val();
        var y2 = $('#y2').val();
        var w = $('#w').val();
        var h = $('#h').val();

        uploadedImage.x1 = x1;
        uploadedImage.x2 = x2;
        uploadedImage.y1 = y1;
        uploadedImage.y2 = y2;
        uploadedImage.w = w;
        uploadedImage.h = h;

        $('.upload-btn').attr('disabled', false);
    });
});

// Show modal for uploading new image
function img_uploader(){
    $("#img-uploader").modal({keyboard: false});
    image_edit_mode = true;
}
var image_edit_mode = false;

// Show image preview
function preview(img, selection) {
    if(image_edit_mode) {
        var mythumb = $('#thumbnail');
        var scaleX = 200 / selection.width;
        var scaleY = 200 / selection.height;
        $('#thumb_preview_holder > img').css({
            width: Math.round(scaleX * mythumb.outerWidth()) + 'px',
            height: Math.round(scaleY * mythumb.outerHeight()) + 'px',
            marginLeft: '-' + Math.round(scaleX * selection.x1) + 'px',
            marginTop: '-' + Math.round(scaleY * selection.y1) + 'px'
        });
        $('#x1').val(selection.x1);
        $('#y1').val(selection.y1);
        $('#x2').val(selection.x2);
        $('#y2').val(selection.y2);
        $('#w').val(selection.width);
        $('#h').val(selection.height);
    }
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            //console.log(e.target.result);
            uploaded_file = e.target;
            getImgSize(e.target.result);
            $('#thumbnails').attr('src', e.target.result);
            $('#thumbnail').attr('src', e.target.result);
            $('#thumb_preview').attr('src', e.target.result);
            $('#filename').attr('value', input.files[0].name);
            $('#filetype').attr('value', input.files[0].type);
            $('#crop-section').show();
            $('#uploader-section').hide();
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function getImgSize(imgSrc) {
    uploaded_image = new Image();
    uploaded_image.onload = function() {
        image_height = uploaded_image.height;
        image_width = uploaded_image.width;
    };
    uploaded_image.src = imgSrc; // this must be done AFTER setting onload
}

function hide_opacity(){
    $(".imgareaselect-outer").hide();
    $(".imgareaselect-border1").hide();
    $(".imgareaselect-border2").hide();
    $(".imgareaselect-border3").hide();
    $(".imgareaselect-border4").hide();
}

function cancel_upload(photo){
    if (imagePath){
        $("#thumb_preview").attr('src', imagePath);
    }else{
        $("#thumb_preview").attr('src', 'images/placeholder.png');
    }
    $("#thumb_preview").removeAttr('style');
}

function discard_upload(){
    $("#thumb_preview").attr('src', 'images/placeholder.png');
    $("#thumb_preview").removeAttr('style');
    $("#x1, #y1, #x2, #y2, #w, #h, #filename, #filetype, #file_obj").val('');
    $('#crop-section').hide();
    $('#uploader-section').show();
    uploadedImage = {};
}

// Function to send request to server for saving image in database
function uploadImage(){
    var formData = new FormData();
    if (uploadedImage) {
        formData.append('imageData', JSON.stringify(uploadedImage));
    }
    if (document.getElementById('file_obj').files[0]) {
        formData.append('image', document.getElementById('file_obj').files[0], document.getElementById('file_obj').files[0].name);
    }

    var xmlRequest = new XMLHttpRequest();
    xmlRequest.open("POST", "uploadImage", true);
    xmlRequest.onload = function (oEvent) {
        if (xmlRequest.status == 200) {
            console.log(xmlRequest.response);
            $('.upload-btn').attr('disabled', true);    // Disabled upload button
            $('.success-message').show();               // Display success message
        } else {
            if (xmlRequest.status == 500) {
                console.log(xmlRequest);
            }else{
                console.log('Undefined error');
            }
        }
    };
    console.log(formData);
    xmlRequest.send(formData);
    return true;
}

function refreshImageUploadForm(){
    discard_upload();
    cancel_upload();
    $('.success-message').hide();
    $('.upload-btn').attr('disabled', true);
}