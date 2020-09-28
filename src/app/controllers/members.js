const {age, gender, date} = require('../../lib/utils');
const Member = require('../models/Member');

module.exports = {
  index: (req,res) => {
    Member.all((members) => {
      res.render('members/index', { members });
    })
  },
  create: (req,res) => {
    return res.render('members/create');
  },
  post: (req,res) => {
    const keys = Object.keys(req.body);
    for(key of keys){
      if(req.body[key]==='')
        return res.send('Preencha todos os campos!');
    };

    let {avatar_url,birth,name,email,gender,blood,height,weight} = req.body; // destructuring the object into variables 

    const values = [
      avatar_url,
      name,
      email,
      date(birth).iso,
      gender,
      weight,
      height,
      blood
    ];
    
    Member.create(values,(member) => {
      res.redirect(`/members/${member.id}`);
    });


  },
  show: (req,res) => {
    let { id } = req.params;
    id = Number(id);
    
    Member.find(id,(member) => {
      if(!member) return res.send('Member not found!');

      const showMember = {
        ...member, // get all the properties of the object and copy to member, but i will rewrite some of the values
        gender:gender(member.gender),
        age:age(member.birth),
        birthDay: date(member.birth).birthDay,             
      };

      return res.render('members/show',{ member:showMember });
    });
    
  },
  edit: (req,res) => {
    const { id } = req.params;

    Member.find(id, (member) => {
      if(!member) return res.send('Member not found!');

      const newMember = {
        ...member,
        birth:date(member.birth).iso
      };

      return res.render('members/edit', { member:newMember }); 
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
      req.body.email,
      date(req.body.birth).iso,
      req.body.gender,
      req.body.weight,
      req.body.height,
      req.body.blood,
      req.body.id
  ];

  Member.update(values,() => {
    res.redirect(`/members/${id}`);
  });
  
  },
  delete: (req,res) => {
    const { id } = req.body;
  
    Member.delete(id,() => {
      res.redirect('/members');
    });
   }
};
