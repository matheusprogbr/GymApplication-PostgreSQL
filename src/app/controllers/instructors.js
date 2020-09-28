const {age, gender, date} = require('../../lib/utils');
const Instructor = require('../models/Instructor');

module.exports = {
  index: (req,res) => {
    Instructor.all((instructors) => {
      res.render('instructors/index', { instructors });
    });
   
  },
  create: (req,res) => {
    return res.render('instructors/create');
  },
  post: (req,res) => {
    const keys = Object.keys(req.body);
    for(key of keys){
      if(req.body[key]==='')
        return res.send('Preencha todos os campos!');
    };

    let {avatar_url,birth,name,services,gender} = req.body; // destructuring the object into variables 

    const values = [
      avatar_url,
      name,
      date(birth).iso,
      gender,
      services,
      date(Date.now()).iso
    ];
    
    Instructor.create(values,(instructor) => {
      res.redirect(`/instructors/${instructor.id}`);
    })


  },
  show: (req,res) => {
    let { id } = req.params;
    id = Number(id);
    
    Instructor.find(id,(instructor) => {
      if(!instructor) return res.send('Instructor not found!');

      const showInstructor = {
        ...instructor, // get all the properties of the object and copy to instructor, but i will rewrite some of the values
        gender:gender(instructor.gender),
        age:age(instructor.birth),             
        services:instructor.services.split(','),        // rewrite the value of services
        created_at: date(instructor.created_at).format      // rewrite the value of created_at
      };

      return res.render('instructors/show',{ instructor:showInstructor });
    });
    
  },
  edit: (req,res) => {
    const { id } = req.params;

    Instructor.find(id, (instructor) => {
      if(!instructor) return res.send('Instructor not found!');

      const newInstructor = {
        ...instructor,
        birth:date(instructor.birth).iso
      };

      return res.render('instructors/edit', { instructor:newInstructor }); 
    });
  },
  put: (req,res) => {
    let { id } = req.body;
  
    const keys = Object.keys(req.body);
    for(key of keys){
      if(req.body[key] == '') return res.send('Preencha todos os campos');
    }
  
    const values = [
      req.body.avatar_url,
      req.body.name,
      date(req.body.birth).iso,
      req.body.gender,
      req.body.services,
      req.body.id
  ];

  Instructor.update(values,() => {
    res.redirect(`/instructors/${id}`)
  });
  
  },
  delete: (req,res) => {
    const { id } = req.body;
  
    Instructor.delete(id,() => {
      res.redirect('/instructors');
    });
   }
};
