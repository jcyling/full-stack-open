export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseModulePart;

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

export interface CoursePartDesc extends CoursePartBase {
  description: string;
}

export interface CourseNormalPart extends CoursePartDesc {
  type: "normal";
}

export interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CoursePartDesc {
  type: "submission";
  exerciseSubmissionLink: string;
}

export interface CourseModulePart extends CoursePartDesc {
  type: "special";
  requirements: string[];
}