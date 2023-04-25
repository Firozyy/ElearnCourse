import { catchasyncerrer } from "../midlewares/catchadyncErrer.js";
import { Course } from "../model/Course.js";
import getDataUri from "../utils/dataUri.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from 'cloudinary'
import {Stat} from '../model/stats.js'

export const getAllCourse = catchasyncerrer(
  async (req, res, next) => {

    const keyword = req.query.keyword || "";
    const catagory = req.query.catagory || "";

    const courses = await Course.find({
      title:{
      $regex:keyword,
       $options:"i"
      },
      catagory:{
        $regex:catagory,
         $options:"i"
        },
     
    }).select("-letures");
    res.status(200).json({
      success: true,
      courses,
    })
  }
);


export const createCourse = catchasyncerrer(
  async (req, res, next) => {
    //using multer for getting req.body

    const { title, catagory, discription, createdBy } = req.body;


    if (!title || !catagory || !discription || !createdBy) {
      return next(new ErrorHandler("please add all fields", 400))
    }
    const file = req.file;

    const file_uri = getDataUri(file);

    const myCloud = await cloudinary.v2.uploader.upload(file_uri.content)

    await Course.create({
      title,
      createdBy,
      catagory,
      discription,
      poster: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url
      },
    });

    res.status(201).json({
      success: true,
      message: "course created successfully you can add lectures"
    });
  }
);

//getcourseleture
export const getcourseleture = catchasyncerrer(
  async (req, res, next) => {


    const course = await Course.findById(req.params.id);
    if (!course) {
      return next(new ErrorHandler("cousrse not found", 404));
    };

    course.views += 1;

    await course.save();

    res.status(201).json({
      success: true,
      lectures: course.lectures,

    });
  }
);

//addcourseleture

export const addcourseleture = catchasyncerrer(
  async (req, res, next) => {

    const { id } = req.params;
    const { title, description } = req.body;

    const course = await Course.findById(id);

    if (!course) return next(new ErrorHandler("Course not found", 404));

    const file = req.file;
    const fileUri = getDataUri(file);

    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content, {
      resource_type: "video",
    });

    course.lectures.push({
      title,
      description,
      video: {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      },
    });

    course.noOfvideos = course.lectures.length;

    await course.save();

    res.status(200).json({
      success: true,
      message: "Lecture added in Course",
    });
  }
);

//deletCourse
export const deletCourse = catchasyncerrer(
  async (req, res, next) => {
    //using multer for getting req.body
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) return next(new ErrorHandler("Course not found", 404));

    await cloudinary.v2.uploader.destroy(course.poster.public_id);

    for (let i = 0; i < course.lectures.length; i++) {
      const singleLecture = course.lectures[i];
      await cloudinary.v2.uploader.destroy(singleLecture.video.public_id, {
        resource_type: "video",
      });
    }

    await course.deleteOne({ id });

    res.status(200).json({
      success: true,
      message: "Course Deleted Successfully", course
    });
  }
);



//deletlecture
export const deletlecture = catchasyncerrer(async (req, res, next) => {


  const { courseId, lecturesId } = req.query;

  const course = await Course.findById(courseId);

  if (!course) return next(new ErrorHandler("Course not found", 404));

  //video delet from cloud statrt>>>
  const lecture = course.lectures.find((e) => {
    if (e._id == lecturesId) return e
  })

  await cloudinary.v2.uploader.destroy(lecture.video.public_id, {
    resource_type:"video"
  });

  //video delet from cloud end >>>


//lecture delet from database

course.lectures = course.lectures.filter((item) => {
  if (item._id.toString() !== lecturesId.toString()) return item;
});



  course.noOfvideos = course.lectures.length;

  await course.save();

  res.status(200).json({
    success: true,
    message: "lecture Deleted Successfully",
  });
}
);


Course.watch().on("change", async () => {
  const stats = await Stat.find({}).sort({ createdAt: "desc" }).limit(1);

  const courses = await Course.find({});

  let totalViews = 0;

  for (let i = 0; i < courses.length; i++) {
    totalViews += courses[i].views;
  }
  stats[0].views = totalViews;
  stats[0].createdAT = new Date(Date.now());

  await stats[0].save();
});
