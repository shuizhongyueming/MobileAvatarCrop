import mobileAvatarCroper from '../mobile-avatar-crop.js';

mobileAvatarCroper(document.getElementById('js_hac_post_file'), function(dataUrl){
    console.log(dataUrl);
}, {size: 200})
