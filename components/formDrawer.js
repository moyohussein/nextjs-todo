import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Input,
    Textarea,
    Checkbox,
    VStack
  } from "@chakra-ui/react"
import { useState, useRef } from "react";

const FormDrawer = ({
    title,
    id, 
    description,
    completed,
    btnTitle,
    variant,
    size,
    radius,
    color,
    handleSave
}) => {
    const [value, setValue] = useState(title);
    const [text, setText] = useState(description);
    const [checked, setChecked] = useState(completed);
    const { isOpen, onOpen, onClose } = useDisclosure(); 
    const btnRef = useRef();
    const item = {
        title: value,
        description: text,
        completed: checked
    };
    const handleSubmit = () => {
        handleSave(item);
        onClose();
        setValue("");
        setChecked(false);
        setText("");
    };

    return ( 
        <>
            <Button
                ref={btnRef}
                borderRadius={radius}
                isFullWidth
                variant={variant}
                size={size}
                colorScheme={color}
                onClick={onOpen}
            >
                {btnTitle}
            </Button>
            <Drawer isOpen={isOpen} onClose={onClose} placement="right">
                <DrawerOverlay />
                <DrawerContent bgColor="blackAlpha.900" color="whiteAlpha.900" >
                <DrawerCloseButton />
                <DrawerHeader>Todo Item</DrawerHeader>
                <DrawerBody >
                    <form>
                        <VStack spacing={5} align="left">
                                <Input 
                                value={value} 
                                onChange={({target}) => setValue(target.value)}
                                name="title" 
                                placeholder="What you want to do..." 
                                textTransform="capitalize"
                            />
                            <Textarea 
                                name="description"
                                textTransform="unset"
                                value={text}
                                onChange={({target}) => setText(target.value)}
                                placeholder="Explanation of what you intend to do..." 
                            />
                            <Checkbox
                                name="status" 
                                value={completed}
                                onChange={() => completed ? setChecked(false) : setChecked(true)}
                            >
                                Completed
                            </Checkbox>
                        </VStack>
                    </form>
                </DrawerBody>
                <DrawerFooter display="flex" flexDir="column">
                    <Button isFullWidth colorScheme="blue" type="submit" onClick={handleSubmit}>
                        Save
                    </Button>
                    <Button colorScheme="whiteAlpha" mt={5} variant="outline" isFullWidth onClick={onClose}>
                        Close
                    </Button>
                </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </> 

    );
}
 
export default FormDrawer;