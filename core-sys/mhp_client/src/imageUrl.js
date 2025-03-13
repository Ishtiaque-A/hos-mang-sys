global.img_url =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_DEV_MODE_IMAGE_URL
    : process.env.REACT_APP_PRO_MODE_IMAGE_URL;

// global.img_url = "http://localhost/mhp_web/mhp_server/public";
//
// global.img_url = 'https://dev.macrohealthplus.org/mhp_server/public';

// global.img_url = "http://greatdoc.org/mhp_server/public";

// global.img_url = "http://doctor.greatdoc.org/mhp_server/public";

//global.img_url = 'https://macrohealthplus.org/mhp_server/public'

// global.img_url = 'https://dev.macrohealthplus.org/test/public'
