

$(document).ready(function() {
  
  console.log ('linked')
  ;

  $.get('http://localhost:3000/foods', function(response) {
      render(response);
  });
})

  var form = $('#addFood')

  form.on('submit', addItem);

  function render(response){
    for (i=0; i<response.length; i++){
      console.log(response[i].name);
      $('#food-list').append('<li id ="item' + response[i].id + '">' + response[i].name + '<button class="deleteButton" data-id=' + response[i].id + '>delete</button></li>');
    }

    

    $('.deleteButton').on('click', function(event){

       id = $(this).attr('data-id')

      $.ajax({
      url: 'http://localhost:3000/foods/'+id,
      type: 'DELETE',
      success: function(result) {
        console.log(result)
        }
      });
     
      $('#item'+id).remove()
    });

  }

  function addItem(e) {
    e.preventDefault()
    console.log('submitted')

    $.ajax({
      url: 'http://localhost:3000/foods/',
      type: 'POST',
      data: form.serialize(),
      success: function(result) {
        console.log(result.name)
        render([result]);
        }


      });
  }









