var objs = payload.DeepDetect.objects;

if (objs.length >= 1) {
  for (var i = 0; i < objs.length; i++) {
    var obj_name = objs[i].name;
    if (obj_name == "good") {
      label = "Good";
    } else {
      label = "Bad";
    }
  }
  
} else {
  label = "Bad"
}
