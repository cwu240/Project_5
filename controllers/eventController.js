const model = require('../models/event');

exports.index = (req, res, next)=>{
Promise.all([
    model.find(),
    model.getDistinctCategories()
])
    .then(([events, categories])=>res.render('./event/index', {events, categories}))
    .catch(err=>next(err));
};

exports.new = (req, res)=>{
    res.render('./event/new');
};

exports.create = (req, res, next)=>{
    let event = new model(req.body);//create a new event document
    event.hostName = req.session.user;
    event.save()//insert the document to the database
    .then(event=> res.redirect('/events'))
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            err.status = 400;
        }
        next(err);
    });
    
};

exports.show = (req, res, next)=>{
    let id = req.params.id;

    model.findById(id).populate('hostName', 'firstName lastName')
    .then(event=>{
        if(event) {    
            console.log(event);   
            return res.render('./event/show', {event});
        } else {
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.edit = (req, res, next)=>{
    let id = req.params.id;
    model.findById(id)
    .then(event=>{
        return res.render('./event/edit', {event});
    })
    .catch(err=>next(err));
};

exports.update = (req, res, next)=>{
    let event = req.body;
    let id = req.params.id;

    model.findByIdAndUpdate(id, event, {useFindAndModify: false, runValidators: true})
    .then(event=>{
         res.redirect('/events/'+id);
    })
    .catch(err=> {
        if(err.name === 'ValidationError')
            err.status = 400;
        next(err);
    });
};

exports.delete = (req, res, next)=>{
    let id = req.params.id;
    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(event =>{
        res.redirect('/events'); 
    })
    .catch(err=>next(err));
};