module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        //缩进tab
        'indent': [
			'error',
			4
        ],
        //window换行
		'linebreak-style': [
			'error',
			'windows'
        ],
        //引号
		'quotes': [
			'error',
			'double'
        ],
        //分号
		'semi': [
			'error',
			'always'
		]
    }
};