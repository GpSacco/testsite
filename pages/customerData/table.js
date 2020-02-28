var data = new Array();
var i = 0
var request = new XMLHttpRequest()
request.open('GET', 'https://jsonplaceholder.typicode.com/users', true)

request.onload = function() {
  var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
    data.forEach(item => {       
      new Vue({
        el: '#app',
        vuetify: new Vuetify(),
        data () {
          return {
            search: '',
            headers: [
              {
                text: 'ID',
                align: 'left',
                sortable: false,
                value: 'id',
              },
              { text: 'name', value: 'name' },
              { text: 'username', value: 'username' },
              { text: 'email', value: 'email' },
              { text: 'phone', value: 'phone' },
              { text: 'website', value: 'website' },
            ],
              desserts: [
                {
                  id: item.id,
                  name: item.name,
                  username: item.username,
                  email: item.email,
                  phone: item.phone,
                  website: item.website,
                },
            ]
          }
        },
      })
    })
    } else {
    console.log('error')
    }
    var things=[];
    things.push(data);
}

request.send()