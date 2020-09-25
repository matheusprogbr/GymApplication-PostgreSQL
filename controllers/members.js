const fs = require('fs');
const data = require('../data.json');
const {age, gender, birth} = require('../utils');

// INDEX
exports.index = (req,res) => {

  return res.render('members/index', { members:data.members });
};

// CREATE
exports.create = (req,res) => {
  return res.render('members/create');
};

// VALIDAÇÃO e CRIAÇÃO
exports.post = (req,res) => {
  const keys = Object.keys(req.body);
  for(key of keys){
    if(req.body[key]==='')
      return res.send('Preencha todos os campos!');
  };

  let { birth } = req.body; // destructuring the object into variables

  birth = Date.parse(birth);
  let id = 1;
  const lastMember = data.members[data.members.length - 1];

  if(lastMember){
    id = lastMember.id + 1;
  }

  data.members.push({
    id,
    ...req.body,
    birth
  });

  fs.writeFile('data.json', JSON.stringify(data,null, 2), (err) => {
    if(err) return res.send('Write file error!');

    return res.redirect(`/members/${id}`);
  });

};

// SHOW
exports.show = (req,res) => {
  const { id } = req.params;

  const foundMember = data.members.find((member) => {
    return id == member.id;
  });

  if(!foundMember) return res.send('Member not found!');

  const member = {
    ...foundMember, // get all the properties of the object and copy to member, but i will rewrite some of the values
    gender:gender(foundMember.gender),
    age:age(foundMember.birth),
    birthDay:birth(foundMember.birth).birthDay             
  };

  return res.render('members/show',{ member });
};

// EDIT
exports.edit =  (req,res) => {
  const { id } = req.params;

  const foundMember = data.members.find((member) => {
    return id == member.id;
  });

  if(!foundMember) return res.send('Member not found!');

  const member = {
    ...foundMember,
    birth:birth(foundMember.birth).iso
  };

  return res.render('members/edit', { member });
};

// PUT
exports.put = (req,res) => {
  let { id } = req.body;
  let index = 0;

  const keys = Object.keys(req.body);
  for(key of keys){
    if(req.body[key] == '') return res.send('Preencha todos os campos');
  }

  const foundMember = data.members.find((member, foundIndex) => {
    if(id == member.id){
      index = foundIndex;
      return true;
    }
  });

  if(!foundMember) return res.send('Member not found!');

  const member = {
    ...foundMember,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id:Number(req.body.id)
  };

  data.members[index] = member;

  fs.writeFile('data.json', JSON.stringify(data, null , 2) , (err) => {
    if(err) return res.send('An error ocurred in the file system!');

    return res.redirect(`/members/${id}`);
  });

};

// DELETE
exports.delete = (req,res) => {
  const { id } = req.body;

  const filteredMembers = data.members.filter((member) => {
    return member.id != id;
  })

  data.members = filteredMembers;

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if(err) return res.send('Error!');

    return res.redirect('/members');
  });
};


