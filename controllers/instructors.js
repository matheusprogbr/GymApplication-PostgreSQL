const fs = require('fs');
const data = require('../data.json');
const {age, gender, birth} = require('../utils');

// INDEX
exports.index = (req,res) => {

  return res.render('instructors/index', { instructors:data.instructors });
}

// VALIDAÇÃO e CRIAÇÃO
exports.post = (req,res) => {
  const keys = Object.keys(req.body);
  for(key of keys){
    if(req.body[key]==='')
      return res.send('Preencha todos os campos!');
  };

  let {avatar_url,birth,name,services,gender} = req.body; // destructuring the object into variables

  birth = Date.parse(req.body.birth);
  const created_at = Date.now(); //get actual time of the app
  let id = 1;
  const lastInstructor = data.instructors[data.instructors.length-1];

  if(lastInstructor){
    id = lastInstructor.id + 1;
  }

  data.instructors.push({
    id,
    name,
    gender,
    birth,
    services,
    avatar_url,
    created_at
  });

  fs.writeFile('data.json', JSON.stringify(data,null, 2), (err) => {
    if(err) return res.send('Write file error!');

    return res.redirect(`/instructors/${id}`);
  });

}

// SHOW
exports.show = (req,res) => {
  const { id } = req.params;

  const foundInstructor = data.instructors.find((instructor) => {
    return id == instructor.id;
  });

  if(!foundInstructor) return res.send('Instructor not found!');

  const instructor = {
    ...foundInstructor, // get all the properties of the object and copy to instructor, but i will rewrite some of the values
    gender:gender(foundInstructor.gender),
    age:age(foundInstructor.birth),             
    services:foundInstructor.services.split(','),        // rewrite the value of services
    created_at: new Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at),      // rewrite the value of created_at
  };

  return res.render('instructors/show',{ instructor });
}

// EDIT
exports.edit =  (req,res) => {
  const { id } = req.params;

  const foundInstructor = data.instructors.find((instructor) => {
    return id == instructor.id;
  });

  if(!foundInstructor) return res.send('Instructor not found!');

  const instructor = {
    ...foundInstructor,
    birth:birth(foundInstructor.birth).iso
  };

  return res.render('instructors/edit', { instructor });
}

// PUT
exports.put = (req,res) => {
  let { id } = req.body;
  let index = 0;

  const keys = Object.keys(req.body);
  for(key of keys){
    if(req.body[key] == '') return res.send('Preencha todos os campos');
  }

  const foundInstructor = data.instructors.find((instructor, foundIndex) => {
    if(id == instructor.id){
      index = foundIndex;
      return true;
    }
  });

  if(!foundInstructor) return res.send('Instructor not found!');

  const instructor = {
    ...foundInstructor,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id:Number(req.body.id)
  };

  data.instructors[index] = instructor;

  fs.writeFile('data.json', JSON.stringify(data, null , 2) , (err) => {
    if(err) return res.send('An error ocurred in the file system!');

    return res.redirect(`/instructors/${id}`);
  });

}

// DELETE
exports.delete = (req,res) => {
  const { id } = req.body;

  const filteredInstructors = data.instructors.filter((instructor) => {
    return instructor.id != id;
  })

  data.instructors = filteredInstructors;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if(err) return res.send('Error!');

    return res.redirect('/instructors');
  });
}


