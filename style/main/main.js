function Themes(){
    this.webtitle = "Android RC Plane"; 
    this.tanggal = $('#tgl').html();
    this.title = $('title').html();
    this.content = $('#content');
    $('title').html(this.title + ' | ' + this.webtitle);

    this.body = $('body'); 
    this.start();
};
Themes.prototype.start = function(){
    this.head();

};
Themes.prototype.head = function(){
    var head = $('<div id="myhead"></div>');
    this.body.append(head);

    var headhtml = '<img id="icon" src="/android_rcplane/style/icon.png"/>' +
    '<h1>Arduino Rc Plane</h1>';

    head.html(headhtml);


    var leftbar = $('<div id="leftbar"></div>');
    this.body.append(leftbar);

    this.createSidebar(leftbar);


    if(window.location.pathname != '/'){  // non root

        var postitle = $('<h2 id="postitle"></h2>'); 
        postitle.text(this.title);
        this.content.prepend(postitle); 
    }
};
Themes.prototype.createSidebar = function(jqsidebar){
 
        var my = this;
        $.get('/android_rcplane/sidebar.txt',function(data){ 
            jqsidebar.append(data); 

            var a = jqsidebar.find('a');

            var bg = my.body.css('backgroundColor');
            var clr = my.body.css('color');
            if(typeof bg== 'undefined'){
                bg == '#fff';
            }
            if(typeof clr == 'undefined'){
                clr = '#000';
            }

            console.log(clr);
 

            a.each(function(){
                if($(this).attr('href') == window.location.pathname){
                    $(this).css({backgroundColor : bg});
                    $(this).css({color : clr});
                }

            })

        });

};



$('body').ready(function(){
        new Themes(); 

});