const styleProps = [
  'borderRadius',
  'padding',
  'margin',
  'bg',
  'colorScheme',
  'size',
  'variant',
  'boxShadow',
  'alignItems',
  'justifyContent',
  'flexDirection',
  'flex',
  'display',
  'width',
  'height',
  'maxW'
];

const filterStyleProps = (props) => {
  const filteredProps = { ...props };
  styleProps.forEach((prop) => {
    delete filteredProps[prop];
  });
  return filteredProps;
};

const chakra = {};

const divComponents = [
  'Box',
  'Container',
  'Flex',
  'VStack',
  'HStack',
  'SimpleGrid',
  'Grid',
];

divComponents.forEach((component) => {
  chakra[component] = ({ children, ...props }) => {
    const nonStyleProps = filterStyleProps(props);
    return <div {...nonStyleProps}>{children}</div>;
  };
});

chakra.Button = ({ children, ...props }) => {
  const nonStyleProps = filterStyleProps(props);
  return <button {...nonStyleProps}>{children}</button>;
};

chakra.Input = ({ ...props }) => {
  const nonStyleProps = filterStyleProps(props);
  return <input {...nonStyleProps} />;
};

chakra.Icon = ({ children, ...props }) => {
  const nonStyleProps = filterStyleProps(props);
  return <span {...nonStyleProps}>{children}</span>;
};

chakra.Text = ({ children, ...props }) => {
  const nonStyleProps = filterStyleProps(props);
  return <span {...nonStyleProps}>{children}</span>;
};

chakra.Heading = ({ children, ...props }) => {
  const nonStyleProps = filterStyleProps(props);
  return <h2 {...nonStyleProps}>{children}</h2>;
};

module.exports = chakra;
