var RuleVar = require('../dao/RuleVar'),
    Response = require('../config/response');

exports.save = function(req, res, next) {
    var ruleVar = req.body;

    RuleVar.save(ruleVar, function success(result) {
        res.json(new Response().success(result));

    }, function error(error) {
        res.status(400).send(new Response().error(error));
    });
};

exports.update = function(req, res, next) {
    var conditions = req.body.conditions;
    var data = req.body.data;
    RuleVar.update(conditions, data, function success(result) {
        res.json(new Response().success(result));

    }, function error(error) {
        res.status(400).send(new Response().error(error));
    });

};

exports.delete = function(req, res, next) {
    var conditions = req.body.conditions;
    RuleVar.delete(conditions, function success(result) {
        res.json(new Response().success(result));

    }, function error(error) {
        res.status(400).send(new Response().error(error));
    });

};

exports.findById = function(req, res, next) {
    RuleVar.find({
        _id: req.params.id
    }, undefined, undefined, function success(result) {
        res.json(new Response().success(result));

    }, function error(error) {
        res.status(400).send(new Response().error(error));
    });
};

exports.find = function(req, res, next) {

    var conditions = req.body.conditions;
    var fields = req.body.fields;
    var options = req.body.options;

    RuleVar.find(conditions, fields, options, function success(result) {
        res.json(new Response().success(result));
    }, function error(error) {
        res.status(400).send(new Response().error(error));
    });
};