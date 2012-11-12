$(document).ready(function(){

	var workers = [
        { name: "Rohit Joshi", address: "Maiti Devi, Anamnagar", tel: "0123456789", email: "rohit@me.com", reward: 68 , quality_score: 66, type : "admin"},
        { name: "Niroj Shrestha", address: "Satdobato, Lalitpur", tel: "11112222", email: "niroj@me.com", reward: 1024 , quality_score: 48},
        { name: "Ashis Bista", address: "Kirtipur, Balkhu", tel: "99990000", email: "ashis@me.com", reward: 2010 , quality_score: 86 }
    ];

    var Worker = Backbone.Model.extend({ defaults:{ type : "normal"  }  });

  //   var WorkerView = Backbone.View.extend({
		// render : function(){
		// 	html = "<p>Worker: "+this.model.get('name')+" | <i>"+this.model.get("type")+"</i></p>";
		// 	$(this.el).html(html);
		// }
  //   });

    var WorkerView = Backbone.View.extend({
        template: _.template("<p> Worker Name: <%= name %> | <i> <%= type %> </i> <button>SHOW</button></p>"),
        render : function(){
            //html = "<p>Worker: "+this.model.get('name')+" | <i>"+this.model.get("type")+"</i></p>";
            var attributes  = this.model.toJSON();
            $(this.el).html(this.template(attributes    ));
        },
        events : {
            "click button" : "show_worker"
        },
        show_worker : function(){
            console.log(this.model.toJSON());
            //alert(this.to_JSON());
        }
    });



    var my_worker = new Worker( workers[0] );

    var worker_view = new WorkerView({ model: my_worker, tagName: 'section'});
 
    worker_view.render();

    $('#worker_list').html( worker_view.el );

    // my_worker.on('myevent', function(){ alert('myevent occured.'); });

    // my_worker.trigger('myevent');

    //my_worker.on('change', function(){ alert('myevent occured.'); } );

	//my_worker.set({ tel : "00001111" });

    //console.log(my_worker);


    var WorkerColl = Backbone.Collection.extend({
        model: Worker
    });

    var WorkerCollView = Backbone.View.extend({
        render: function () {
            var div = $('<div />');
            _.each( this.collection.models, function (w) {
                this_worker = new WorkerView({ model: w });
                this_worker.render();
                div.append(this_worker.el);
            });

            $(this.el).html(div);

        }
    });

    var workers_coll = new WorkerColl(workers);

    var worker_coll_view = new WorkerCollView({ collection: workers_coll });
    worker_coll_view.render();
    //console.log(worker_coll_view);
    $('#worker_collection').html(worker_coll_view.el);

});