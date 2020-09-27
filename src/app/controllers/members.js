const {age, gender, date} = require('../../lib/utils');

module.exports = {
  index: (req,res) => {
    return res.render('members/index', { members:data.members });
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

    let {avatar_url,birth,name,services,gender} = req.body; // destructuring the object into variables

    birth = Date.parse(req.body.birth);
    const created_at = Date.now(); //get actual time of the app
    let id = 1;
    const lastMember = data.members[data.members.length-1];

    if(lastMember){
      id = lastMember.id + 1;
    }

    data.members.push({
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

      return res.redirect(`/members/${id}`);
  });
  
  },
  show: (req,res) => {
    const { id } = req.params;

    const foundMember = data.members.find((member) => {
      return id == member.id;
    });

    if(!foundMember) return res.send('Member not found!');

    const member = {
      ...foundMember, // get all the properties of the object and copy to member, but i will rewrite some of the values
      gender:gender(foundMember.gender),
      age:age(foundMember.birth),             
      services:foundMember.services.split(','),        // rewrite the value of services
      created_at: new Intl.DateTimeFormat('pt-BR').format(foundMember.created_at),      // rewrite the value of created_at
    };

    return res.render('members/show',{ member });
  },
  edit: (req,res) => {
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
  },
  put: (req,res) => {
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
  
  },
  delete: (req,res) => {
    const { id } = req.body;

    const filteredMembers = data.members.filter((member) => {
      return member.id != id;
    })
  
    data.members = filteredMembers;
  
    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
      if(err) return res.send('Error!');
  
      return res.redirect('/members');
    });
  }
};
