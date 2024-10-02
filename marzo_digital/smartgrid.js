const smartgrid = require('smart-grid');

const settings = {
    columns: 12,
    offset: '20px',
    container: {
        maxWidth: '1440px',
        fields: '60px'
    },
    breakPoints: {
        lg: {
            width: "1440px"
        },
        mmd: {
            width: "1240px"
        },
        md: {
            width: "1024px",
            fields: "30px"
        },
        sm: {
            width: "768px",
            fields: "16px"
        },
        xs: {
            width: "576px",
        }
    },
    oldSizeStyle: false,
    mobileFirst: false
};

smartgrid('./src/less', settings);