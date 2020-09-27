const {age, gender, date} = require('../../lib/utils');
const db = require('../config/db');

module.exports = {
  // index: (req,res) => {
  //   // return res.render('instructors/index', { instructors:data.instructors });
  //   return res.send('index');
  // },
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

    const queryInsert = `INSERT INTO instructors ("avatar_url","name","birth","gender","services","created_at") 
                         VALUES ($1, $2, $3, $4, $5, $6)`;

    const values = [
      avatar_url,
      name,
      date(birth).iso,
      gender,
      services,
      date(Date.now()).iso
    ];
    
    db.query(queryInsert, values, (err, results) => {
      if(err) return res.send('DATABASE internal error!');
      console.log(results);
      return res.send('Criado com sucesso!');
    });


  },
  // show: (req,res) => {
  //   // const { id } = req.params;

  //   // const foundInstructor = data.instructors.find((instructor) => {
  //   //   return id == instructor.id;
  //   // });

  //   // if(!foundInstructor) return res.send('Instructor not found!');

  //   // const instructor = {
  //   //   ...foundInstructor, // get all the properties of the object and copy to instructor, but i will rewrite some of the values
  //   //   gender:gender(foundInstructor.gender),
  //   //   age:age(foundInstructor.birth),             
  //   //   services:foundInstructor.services.split(','),        // rewrite the value of services
  //   //   created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at),      // rewrite the value of created_at
  //   // };

  //   // return res.render('instructors/show',{ instructor });
  //   return
  // },
  // edit: (req,res) => {
  //   // const { id } = req.params;

  //   // const foundInstructor = data.instructors.find((instructor) => {
  //   //   return id == instructor.id;
  //   // });
  
  //   // if(!foundInstructor) return res.send('Instructor not found!');
  
  //   // const instructor = {
  //   //   ...foundInstructor,
  //   //   birth:birth(foundInstructor.birth).iso
  //   // };
  
  //   // return res.render('instructors/edit', { instructor });    
  //   return
  // },
  // put: (req,res) => {
  //   // let { id } = req.body;
  //   // let index = 0;
  
  //   // const keys = Object.keys(req.body);
  //   // for(key of keys){
  //   //   if(req.body[key] == '') return res.send('Preencha todos os campos');
  //   // }
  
  //   // const foundInstructor = data.instructors.find((instructor, foundIndex) => {
  //   //   if(id == instructor.id){
  //   //     index = foundIndex;
  //   //     return true;
  //   //   }
  //   // });
  
  //   // if(!foundInstructor) return res.send('Instructor not found!');
  
  //   // const instructor = {
  //   //   ...foundInstructor,
  //   //   ...req.body,
  //   //   birth: Date.parse(req.body.birth),
  //   //   id:Number(req.body.id)
  //   // };
  
  //   // data.instructors[index] = instructor;
  
  //   // fs.writeFile('data.json', JSON.stringify(data, null , 2) , (err) => {
  //   //   if(err) return res.send('An error ocurred in the file system!');
  
  //   //   return res.redirect(`/instructors/${id}`);
  //   // });

  //   return
  
  // },
  // delete: (req,res) => {
  // //   const { id } = req.body;

  // //   const filteredInstructors = data.instructors.filter((instructor) => {
  // //     return instructor.id != id;
  // //   })
  
  // //   data.instructors = filteredInstructors;
  
  // //   fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
  // //     if(err) return res.send('Error!');
  
  // //     return res.redirect('/instructors');
  // //   });
  // return
  //  }
};
