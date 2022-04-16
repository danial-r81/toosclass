import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
   getCoursesPackages,
   getCoursPack,
   getCourseItems,
   getCourse,
   getCourseSessions,
   getNewsCourses,
   getMyCourses,
   getSuggestedCourses,
   isCourseBought,
} from '../../services/coursesServices';

export const getCoursesPackageHandler = createAsyncThunk(
   'get-packages',
   async () => {
      try {
         const { data, status } = await getCoursesPackages();
         if (status === 200) {
            return { data };
         }
      } catch (er) {
         console.log(er);
      }
   }
);

export const getCoursePackHandler = createAsyncThunk(
   'get-package-item',
   async (arg) => {
      const { navigate, item } = arg;
      try {
         const { data, status } = await getCoursPack(item.code);
         if (status === 200) {
            localStorage.setItem('course_id', item.code);
            navigate(`/courses/${item.path}`);
            return data;
         }
      } catch (er) {
         console.log(er);
      }
   }
);

export const getCoursePackAfterRefresh = createAsyncThunk(
   'get-package-items-ar',
   async (arg, { dispatch }) => {
      try {
         const { data, status } = await getCoursPack(arg);
         const firstItemOfData = data[0].code;
         if (status === 200) {
            dispatch(getCoursesItemsHandler(firstItemOfData));
            return { data };
         }
      } catch (er) {
         console.log(er);
      }
   }
);

export const getCoursesItemsHandler = createAsyncThunk(
   'get-courses-items',
   async (arg) => {
      try {
         const { data, status } = await getCourseItems(arg);
         if (status === 200) {
            return data;
         }
      } catch (er) {
         console.log(er.response);
      }
   }
);

export const getCourseHandler = createAsyncThunk(
   'get-course',
   async (arg, { dispatch }) => {
      const { code, navigate, phoneNumber } = arg;
      try {
         const { data, status } = await getCourse(code);
         if (status === 200) {
            localStorage.setItem('course_code', code);
            navigate(`/courses/${data.path}`);
            return { data };
         }
      } catch (er) {
         console.log(er);
      }
   }
);

export const isCourseBoughtHandler = createAsyncThunk(
   'is-bought',
   async (arg) => {
      const { phoneNumber, code } = arg;
      try {
         const { data, status } = await isCourseBought(phoneNumber, code);
         console.log(data);
         if (status === 200) {
            return { data };
         }
      } catch (er) {
         console.log(er.response);
      }
   }
);

export const getCourseAfterRefresh = createAsyncThunk(
   'get-course-ar',
   async (arg) => {
      try {
         const { data, status } = await getCourse(arg);
         if (status === 200) {
            return { data };
         }
      } catch (er) {
         console.log(er);
      }
   }
);

export const getCourseSessionsHandler = createAsyncThunk(
   'get-sessions',
   async (arg) => {
      try {
         const { data, status } = await getCourseSessions(arg);
         if (status === 200) {
            return { data };
         }
      } catch (er) {
         console.log(er);
      }
   }
);

export const getNewsCoursesHandler = createAsyncThunk(
   'get-news-courses',
   async () => {
      try {
         const { data, status } = await getNewsCourses();
         if (status === 200) {
            return { data };
         }
      } catch (er) {}
   }
);

export const getMyCoursesHandler = createAsyncThunk(
   'get-my-courses',
   async (arg) => {
      const { phoneNumber, navigate } = arg;
      try {
         const { data, status } = await getMyCourses(phoneNumber);
         if (status === 200) {
            navigate('/profile/my-courses ');
            return { data };
         }
      } catch (er) {
         console.log(er);
      }
   }
);

export const getMyCoursesHandlerAfterRefresh = createAsyncThunk(
   'get-my-courses-ar',
   async (arg) => {
      try {
         const { data, status } = await getMyCourses(arg);
         if (status === 200) {
            return { data };
         }
      } catch (er) {
         console.log(er);
      }
   }
);

export const getSuggetsedCoursesHandler = createAsyncThunk(
   'get-suggestions',
   async (arg) => {
      try {
         const { data, status } = await getSuggestedCourses(arg);
         if (status === 200) {
            return { data };
         }
      } catch (er) {
         console.log(er);
      }
   }
);

const coursesReducer = createSlice({
   name: 'courses',
   initialState: {
      coursePackages: [],
      coursePackageItems: [],
      coursesItems: [],
      courseSessions: [],
      newsCourses: [],
      myCourses: [],
      suggestedCourses: [],
      course: {},
      packageTitle: '',
      firstButtonClassName: '',
      isFree: false,
      loading: false,
   },
   extraReducers: {
      [getCoursesPackageHandler.fulfilled]: (state, action) => {
         state.coursePackages = action.payload.data;
      },
      [getCoursePackHandler.fulfilled]: (state, action) => {
         state.coursePackageItems = action.payload;
      },
      [getCoursePackAfterRefresh.fulfilled]: (state, action) => {
         state.coursePackageItems = action.payload.data;
         state.packageTitle = action.payload.data[0].package_title;
         state.firstButtonClassName = 'active';
      },
      [getCoursesItemsHandler.pending]: (state, action) => {
         state.loading = true;
      },
      [getCoursesItemsHandler.fulfilled]: (state, action) => {
         state.coursesItems = action.payload;
         state.loading = false;
      },
      [getCourseHandler.fulfilled]: (state, action) => {
         state.course = action.payload.data;
      },
      [getCourseAfterRefresh.fulfilled]: (state, action) => {
         state.course = action.payload.data;
      },
      [getCourseSessionsHandler.fulfilled]: (state, action) => {
         state.courseSessions = action.payload.data;
      },
      [getNewsCoursesHandler.fulfilled]: (state, action) => {
         state.newsCourses = action.payload.data;
      },
      [getMyCoursesHandler.fulfilled]: (state, action) => {
         state.myCourses = action.payload.data;
      },
      [getMyCoursesHandlerAfterRefresh.fulfilled]: (state, action) => {
         state.myCourses = action.payload.data;
      },
      [getSuggetsedCoursesHandler.fulfilled]: (state, action) => {
         state.suggestedCourses = action.payload.data;
      },
      [isCourseBoughtHandler.fulfilled]: (state, action) => {
         console.log(action);
         state.isFree = action.payload.data;
      },
   },
});

export default coursesReducer.reducer;
