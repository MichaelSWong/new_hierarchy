import * as yup from 'yup';

const NodesSchema = yup.object().shape({
  name: yup.string(),
  nodes: yup.array().of(
    yup.object().shape({
      id: yup.string(),
      text: yup.string(),
      droppable: yup.boolean(),
      parent: yup.string(),
      data: yup.object().shape({
        isDirtied: yup.boolean(),
        startDate: yup.date(),
        endDate: yup.date().nullable(true),
        lastUpdate: yup.object().shape({
          timeStampe: yup.date(),
          user: yup.string(),
          inverseTimeStamp: yup.number(),
        }),
        level: yup.object().shape({
          levelName: yup.string(),
        }),
        member: yup.array().of(
          yup.object().shape({
            function: yup.object().shape({
              functionName: yup.string(),
              terminationDate: yup.date().nullable(true),
              numberOfPosition: yup.number(),
              owner: yup.boolean(),
            }),
            user: yup.string(),
            startDate: yup.date(),
            endDate: yup.date().nullable(true),
          }),
        ),
      }),
    }),
  ),
});

const createHierarchySchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  applications: yup.array().of(
    yup.object().shape({
      applicationName: yup.string().required(),
      roles: yup.array().required(),
    }),
  ),
  node: yup.object().shape({
    nodeName: yup.string().required(),
    nodeLevel: yup.string().required(),
  }),
});

const hierarchyApplicationsSchema = yup.object().shape({
  name: yup.string().required(),
  applications: yup.array().of(
    yup.object().shape({
      applicationName: yup.string().required(),
      roles: yup.array().required(),
    }),
  ),
});

const hierarchyLevelsSchema = yup.object().shape({
  name: yup.string().required(),
  levels: yup.array().of(
    yup.object().shape({
      levelName: yup.string().required(),
    }),
  ),
});

const hierarchyFunctionsSchema = yup.object().shape({
  name: yup.string().required(),
  functions: yup.array().of(
    yup.object().shape({
      functionName: yup.string(),
      terminationDate: yup.date().nullable(true),
      numberOfPosition: yup.number(),
      owner: yup.boolean(),
    }),
  ),
});

export {
  createHierarchySchema,
  hierarchyApplicationsSchema,
  hierarchyFunctionsSchema,
  hierarchyLevelsSchema,
  NodesSchema,
};
