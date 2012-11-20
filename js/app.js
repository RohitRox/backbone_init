$(document).ready(function(){

	var workers = [
        { id: '1', status: 'active', name: "Rohit Joshi", address: "Maiti Devi, Anamnagar", tel: "0123456789", email: "rohit@me.com", reward: 68 , quality_score: 66, type : "admin"},
        { id: '2', status: 'active', name: "Niroj Shrestha", address: "Satdobato, Lalitpur", tel: "11112222", email: "niroj@me.com", reward: 1024 , quality_score: 48},
        { id: '3', status: 'disabled', name: "Ashis Bista", address: "Kirtipur, Balkhu", tel: "99990000", email: "ashis@me.com", reward: 2010 , quality_score: 86 },
        { id: '4', status: 'active', name: "Bikash Dai", address: "Patan, KTM", tel: "12341234", email: "bikash@me.com", reward: 1090 , quality_score: 96 }
    ];

    var Worker = Backbone.Model.extend({ defaults:{ type : "normal"  },
    change_state: function(state_val){
        this.set({ status: state_val});
    } });

  //   var WorkerView = Backbone.View.extend({
		// render : function(){
		// 	html = "<p>Worker: "+this.model.get('name')+" | <i>"+this.model.get("type")+"</i></p>";
		// 	$(this.el).html(html);
		// }
  //   });

    var WorkerView = Backbone.View.extend({
        show_template: _.template("<p class='details'> Address: <%= address %> | Tel: <%= tel %> | Quality Score: <%= quality_score %></p>"),
        template: _.template("<p> <input type='radio' value ='active' name='status_<% print(id) %>' <% if (status=='active') print('checked') %> />Active <input value ='disabled' type='radio' name='status_<% print(id) %>' <% if (status=='disabled') print('checked') %> /> Disabled Worker Name: <%= name %> <% if (type=='admin') print ('*') %> | <i> <%= type %> </i> <button class='expand'>Show</button> <button class='destroy'>Delete</button></p>"),
        render : function(){
            //html = "<p>Worker: "+this.model.get('name')+" | <i>"+this.model.get("type")+"</i></p>";
            var attributes  = this.model.toJSON();
            $(this.el).html(this.template(attributes));
            if (this.model.get('status') == 'disabled') {
                $(this.el).addClass('disabled'); }else { $(this.el).removeClass('disabled'); }
        },
        initialize: function(){
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },
        events : {
            "click .expand" : "show_worker",
            "click .close" : "close_worker",
            "change input[type='radio']": "change_state",
            'click .destroy': "delete_worker"
        },
        show_worker : function(e){
            $(e.currentTarget).removeClass('expand').addClass('close').text('Hide');
            $(this.el).append(this.show_template(this.model.toJSON()));
            //$(this).append(this.el);
        },
        close_worker: function(e){
            $(e.currentTarget).removeClass('close').addClass('expand').text('Show');
            $(this.el).find('.details').remove();
        },
        change_state: function(e){
            this.model.change_state( $(e.currentTarget).val() );
            //this.render();
        },
        delete_worker: function(e){
            //this.model.destroy();
            $(this.el).remove();
        }
    });



    var my_worker = new Worker( workers[0] );

    var worker_view = new WorkerView({ model: my_worker, tagName: 'section'});
 
    //worker_view.render();

    //$('#worker_list').html( worker_view.el );

    // my_worker.on('myevent', function(){ alert('myevent occured.'); });

    // my_worker.trigger('myevent');

    //my_worker.on('change', function(){ alert('myevent occured.'); } );

	//my_worker.set({ tel : "00001111" });

    //console.log(my_worker);


    var WorkerColl = Backbone.Collection.extend({
        model: Worker
    });

    var WorkerCollView = Backbone.View.extend({
        tagName:'section',
        className: 'worker_list',
        initialize: function(){
            this.collection.on('add', this.renderItem, this);
        },
        render: function () {
            this.collection.forEach( this.renderItem, this );
            return this;

        },
        renderItem: function(worker){
            var this_worker = new WorkerView({ model: worker });
            this_worker.render();
            $(this.el).append(this_worker.el);
        }
    });

    var workers_coll = new WorkerColl(workers);

    var worker_coll_view = new WorkerCollView({ collection: workers_coll });

    worker_coll_view.render();
    //console.log(worker_coll_view.el);
    $('#worker_collection').html(worker_coll_view.el);

    $('#add_worker').click(function(){
        var id = Math.floor(Math.random()*100) + 5;
        var new_worker = new Worker({ id: id, status: 'active', name: "New Man Dai", address: "New Patan, KTM", tel: "777000", email: "newguy@me.com", reward: 465 , quality_score: 98 });
        workers_coll.add(new_worker);
    });

});