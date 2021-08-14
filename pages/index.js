import { Button } from '@chakra-ui/button'
import { Box, Container, Flex, Heading, HStack, Text, List, ListItem, Divider } from '@chakra-ui/layout'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import FormDrawer from "../components/formDrawer"
import axios from "axios";


export default function Home() {
  const [viewCompleted, setViewCompleted] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const displayCompleted = (status) => {
    status ? setViewCompleted(true) : setViewCompleted(false)
  };
  
  const url = 'http://localhost:8000/api/todos/'; //change url when django is deployed to heroku
  useEffect(() => fetchData(),[]);

  const fetchData = () => {
    axios.get(url)
      .then((res) => setTodoList(res.data))
      .catch((err) => console.log(err));
  };
  
  const handleSave = (item) => {
    item.id ? 
      axios.put(`${url}${item.id}/`, item)
        .then((res) => fetchData()) :
      axios.post(`${url}`, item)
      .then((res) => fetchData())
  };

  const handleDelete = (item) => {
    axios
      .delete(`${url}${item}/`)
      .then((res) => fetchData());
  };


  const RenderItems = () => {
    const newItems = todoList.filter((item) => item.completed == viewCompleted);

    return (
      <>
        {newItems.map(item => (
          <ListItem 
            display = "flex" 
            px={3}
            py={3}
            key={item.id}
            alignItems="center"
            justifyContent="space-between"
            borderColor="whiteAlpha.300"
            borderStyle="solid"
            borderBottomWidth={1}
          >
            <Text>{item.title}</Text>
            <HStack spacing={3}>
                <FormDrawer 
                  btnTitle="Edit"
                  completed={item.completed}
                  title={item.title}
                  description={item.description}
                  id={item.id}
                  variant="solid"
                  color="whiteAlpha"
                  radius="base"
                  size="sm"
                  handleSave={handleSave}
                />
              <Button title="Delete" onClick={() => handleDelete(item.id)} colorScheme="red" isFullWidth size="sm">Delete</Button>
            </HStack>
          </ListItem>
        ))}
      </>
    )
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      justify="center"
      align="center"
      backgroundColor="blackAlpha.900"
      flexDir="column"
      color="whiteAlpha.900"
    >
      <Head>
        <title>Django-todo-react</title>
        <meta name="description" content="A todo app with nextjs frontend and django.py for backend" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Heading m={2} align="center" textTransform="uppercase">todo-app</Heading>
        <Container 
          maxw="container.md"
          color="whiteAlpha.900"
          borderRadius="2xl"
          boxShadow="dark-lg"
          py={5}
          pos="relative"
          borderRight="unset"
        >
          <Box as="main">
            <FormDrawer 
              btnTitle="Add Task"
              completed={false}
              title=""
              description=""
              id=""
              variant="ghost"
              radius="full"
              color="blue"
              size="md"
              handleSave={handleSave}
            />
            <Divider borderColor="whiteAlpha.200" />
            <Flex mt={5} mb={10} w="100%" align="center" justifyContent="space-around">
              <Button
                variant={viewCompleted ? "solid" : "outline"}
                colorScheme="blue"
                size="sm"
                onClick={() => displayCompleted(true)}
              >
                Completed tasks
              </Button>
              <Button
                variant={!viewCompleted ? "solid" : "outline"}
                colorScheme="blue"
                size="sm"
                onClick={() => displayCompleted(false)}
              >
                Uncompleted tasks
              </Button>
            </Flex>
            <List>
              <RenderItems />
            </List>
          </Box>
        </Container>
    </Flex>
  )
};

