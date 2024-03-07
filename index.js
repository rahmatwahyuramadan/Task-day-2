import express from 'express';
import handlebars from 'handlebars';
const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.set("views", "scr/views");

app.use("/asset", express.static("scr/asset"));
app.use(express.urlencoded({ extended: false }));

app.get('/AddProject', AddProject);
app.post("/AddProject", handleAddProject);
app.get("/deleteProject/:id", handleDeleteProject);
app.get('/home', home);
app.get('/myProject', myProject);
app.get('/project-detail/:id', projectDetail);
app.get('/testimoni', testimoni);
app.get("/contact-me", contactMe);
app.get("/project_edit/:id", projectEdit);
app.post("/AddProject:id/update", projectUpdate);

let datas = [
    {
        project: "test",
        description: "test",
        date1: "2024-03-06",
        date2: "2024-03-19",
        node: true,
        next: true, 
        react: true, 
        golang: true,
        diff: getDistenceTime(new Date("02/04/2024"), new Date("03/04/2024"))
    }
]

function getDistenceTime(startDate, endDate) {
    let timeStart = startDate;
    let timeEnd = endDate;
    let getDistenceTime = endDate - startDate; 
    console.log(getDistenceTime);
  
    const diffTime = Math.abs(timeEnd - timeStart);
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
  
  
    if (days === 1) {
      return "1 day";
    }
  
    if (days < 30) {
      return days + " days";
    }
  
    if (months === 1) {
      return "1 month";
    }
  
    if (months < 12) {
      return months + " months";
    }
  
    if (years === 1) {
      return "1 year";
    }
  
    return years + " years";
    
  }
function AddProject(req, res){
    res.render("AddProject")
}
function contactMe(req, res){
    res.render("contact-me")
}
function home(req, res){
    res.render("home")
}
function myProject(req, res){
    res.render("myProject", {datas})
}
function projectDetail(req, res){
    const id = req.params.id
    
    res.render("project-detail", {id, datas})
}
function testimoni(req, res){
    res.render("testimoni")
}
function handleAddProject(req, res){
    // const project = req.body.project
    // const description = req.body.description
    // console.log("berhasil submit data :", project)
    // console.log("berhasil submit data descripsi :", description)
    
    const {project, description, date1, date2, node, next, react, golang} = req.body
    // console.log(project, "," , description, ",", diff )
    
    datas.push({ 
        project, 
        description, 
        date1, 
        date2, 
        node, 
        next, 
        react, 
        golang, 
        diff: getDistenceTime(new Date(date1), new Date(date2)), });

    console.log(datas)

    res.redirect("/myProject")
}
function handleDeleteProject(req, res) {
    const { id } = req.params;
  
    datas.splice(id, 1);
  
    res.redirect("/myProject");
}
function projectEdit (req, res) {
  const { id } = req.params;
  console.log(datas[id]);

  res.render("project_edit", {
    data: datas[id],
    id,
    currentUrl: req.path,
  });
};

function projectUpdate (req, res) {
  const { id } = req.params;
  const {project, description, date1, date2, node, next, react, golang} = req.body;
      
  datas.splice(id, 1, {
        project, 
        description, 
        date1, 
        date2, 
        node, 
        next, 
        react, 
        golang, 
        diff: getDistenceTime(new Date(date1), new Date(date2))
  });

  res.redirect("/home");
};

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })