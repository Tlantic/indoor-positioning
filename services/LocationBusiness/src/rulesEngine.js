var _ = require('lodash');

_checkRule = function(data, rule) {
	
	var result = [];
	_.keys(data).forEach(function(key) {
		var vr = key;
		_(rule.restrictions).forEach(function(restriction) {
			if (restriction.variable.code.toUpperCase() === vr.toUpperCase()){

				console.log(vr.toUpperCase() +" "+data[vr] +" "+ restriction.operator.code +" "+restriction.value);
				if(restriction.operator.code === 'EQUAL'){
					result.push(data[vr].toUpperCase()===restriction.value.toUpperCase() ? 1 : 0);
				}
				if(restriction.operator.code === 'LESS_THAN_EQUAL'){
					if(restriction.variable.type!=='NUMBER')
						result.push(0);
					else
						result.push(restriction.value<=data[vr] ? 1 : 0);
				}
				if(restriction.operator.code === 'GREATER_THAN_EQUAL'){
					if(restriction.variable.type!=='NUMBER')
						result.push(1);
					else
						result.push(restriction.value>=data[vr] ? 1 : 0);
				}
				if(restriction.operator.code === 'LESS_THAN'){
					if(restriction.variable.type!=='NUMBER')
						result.push(0);
					else
						result.push(restriction.value<data[vr] ? 1 : 0);
				}
				if(restriction.operator.code === 'GREATER_THAN'){
					if(restriction.variable.type!=='NUMBER')
						result.push(1);
					else{
						result.push(parseFloat(data[vr])>parseFloat(restriction.value) ? 1 : 0);
					}
				}

			}
		})
	});

	var sum = _.reduce(result, function(sum, num) {
	  return sum + num;
	});
	
	return sum/result.length === 1 ? true : false;
}

exports.checkRule = _checkRule;