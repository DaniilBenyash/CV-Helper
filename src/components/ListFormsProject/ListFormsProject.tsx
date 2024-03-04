import { useEffect, useState } from "react";
import { Button, Flex } from "antd";
import { FormProject } from "../FormProject";
import { dateFormat } from "../InputDate";
import dayjs from "dayjs";

export type ProjectType = {
  id: number;
  firstDate: string;
  lastDate: string;
  dateRange: number;
  technologies: string;
};

let nextId = 1;

const currentMonth = dayjs().format(dateFormat);

const intitialState: ProjectType[] = [
  { id: 0, firstDate: currentMonth, lastDate: currentMonth, dateRange: 0, technologies: "" },
];

export const ListFormsProject = () => {
  const [projects, setProjects] = useState(intitialState);

  const handleAddProject = () => {
    setProjects([
      ...projects,
      {
        id: nextId,
        firstDate: projects[nextId - 1].firstDate,
        lastDate: projects[nextId - 1].firstDate,
        dateRange: 0,
        technologies: "",
      },
    ]);
    nextId++;
  };

  const handleChangeProject = (value: ProjectType) => {
    setProjects(
      projects.map((project) => {
        if (project.id === value.id) {
          return { ...value };
        }

        return project;
      }),
    );
    setProjects((projects) => {
      return projects.map((project, id) => {
        const checkPreviousProjectFirstDateLessThenCurrentAllDate =
          id > 0 &&
          dayjs(project.lastDate, dateFormat).diff(dayjs(projects[id - 1].firstDate, dateFormat)) >
            0;

        if (checkPreviousProjectFirstDateLessThenCurrentAllDate) {
          const previousProject = projects[id - 1];
          const checkPcheckPreviousProjectFirstDateLessThenCurrentFirstDate =
            dayjs(project.firstDate, dateFormat).diff(
              dayjs(previousProject.firstDate, dateFormat),
            ) > 0;

          return {
            ...project,
            firstDate: checkPcheckPreviousProjectFirstDateLessThenCurrentFirstDate
              ? previousProject.firstDate
              : project.firstDate,
            lastDate: previousProject.firstDate,
            dateRange: dayjs(previousProject.firstDate).diff(
              checkPcheckPreviousProjectFirstDateLessThenCurrentFirstDate
                ? previousProject.firstDate
                : project.firstDate,
              "month",
            ),
          };
        }
        return project;
      });
    });
  };
  useEffect(() => console.log(projects));
  return (
    <Flex gap="middle">
      {projects.map((project) => {
        return (
          <FormProject key={project.id} projectData={project} onSubmit={handleChangeProject} />
        );
      })}
      <Button onClick={handleAddProject}>Add project</Button>
    </Flex>
  );
};
