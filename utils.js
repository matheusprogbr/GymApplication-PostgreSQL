module.exports = {
  age: (timestamp) => {
    const today = new Date();
    const birthDate = new Date(timestamp);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    const day = today.getUTCDate() - birthDate.getUTCDate();

    if((month < 0) || ((month == 0) && (day < 0))) return --age;

    return age;
  },

  gender: (value) => {
    if(value == 'M') return 'Masculino';
    return 'Feminino';
  },

  birth:(timestamp) => {
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const month = `0${date.getUTCMonth() + 1}`.slice(-2);
    const day = `0${date.getUTCDate()}`.slice(-2);

    return {
      day,
      month,
      year,
      iso:`${year}-${month}-${day}`,
      birthDay:`${day}/${month}`
    };
  }
};