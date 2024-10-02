const smartgrid = require('smart-grid');

const settings = {
    columns: 12,
    offset: '20px',
    container: {
        maxWidth: '1920px',
        fields: '140px'
    },
    breakPoints: {
        lg: {
            width: "1440px",
            fields: "50px"
        },
        md: {
            width: "1024px",
            fields: "20px"
        },
        sm: {
            width: "760px"
        },
        xs: {
            width: "480px"
        }
    },
    oldSizeStyle: false,
    mobileFirst: false
};

smartgrid('./src/less', settings);