var i = setInterval(function(){
  d3.selectAll("section").each(function(d){

  })
},500)


d3.json("bans.json", function(error, bans) {
  console.log(bans)

  bans = bans.filter(function(element){
    if(element.ends < Date.now()) return false
    return true
  })

  console.log(bans)

  d3.select(".sinners").html("")
    .selectAll("section").data(bans).enter()
      .append("section").attr("class","sinner").call(function(parent){
        parent.append("h2").text(function(d){
          return d.name
        })
        parent.append("h3").text(function(d){
          return (new Date((d.ends-Date.now()))).toISOString().slice(11, -1)
        })
        parent.append("svg").append("rect").attr("fill",function(d){
          return chroma.mix("green","red",(d.ends-Date.now())/d.duration)
        }).attr("x",0).attr("y",0).attr("height",50).attr("width",function(d){return (
          (d.ends-Date.now())/d.duration*100
        )+"%"}).transition().duration(function(d){return (d.ends-Date.now())}).ease(d3.easeLinear).attr("width","0%").attr("fill","green")
      })
})
