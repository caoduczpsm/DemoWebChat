import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Image,
  InputGroup,
  Input,
  useToast,
  FormControl,
  FormLabel,
  Text
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pic, setPic] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState();
  const toast = useToast();
  const history = useHistory();
  const owner = localStorage.getItem('userInfo');

  const userId = user._id;
  const ownerId = JSON.parse(owner)._id;

  const postDetails = (pics) => {
    setLoading(true);

    if (pics === undefined) {
      toast({
        title: 'Please Select a Picture.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dyzfolxdv");
      fetch("https://api.cloudinary.com/v1_1/dyzfolxdv/image/upload", {
        method: "put",
        body: data
      }).then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });

    } else {
      toast({
        title: 'Please Select a Picture.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  }

  const submitHandler = async () => {
    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };

      const id = user._id;

      const { data } = await axios.put("/api/user/updateProfile",
        { name, email, pic, id, password }, config);

      toast({
        title: 'Update Information Successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);

      history.push('/chats');

    } catch (error) {
      toast({
        title: 'Error Occured.',
        description: error.response.data.message,
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton display={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}

      {(userId === ownerId ?
        (<>
          <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered >
            <ModalOverlay />
            <ModalContent h="600px" backgroundColor="#6096B4">
              <ModalHeader
                fontSize="25px"
                fontFamily="Work sans"
                display="flex"
                color="white"
                justifyContent="center"
              >
                Your Profile
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="space-between"
              >
                <Image
                  borderRadius="full"
                  boxSize="150px"
                  src={user.pic}
                  alt={user.name}
                />
                <InputGroup
                  display="flex" alignItems="center"
                  style={{ marginTop: 15 }}>

                  <FormLabel color="white">Email</FormLabel>
                  <Input
                    fontSize={{ base: "20px", md: "20px" }}
                    fontFamily="Work sans"
                    placeholder={user.email}
                    onChange={(e) => setEmail(e.target.value)}
                    backgroundColor="white">
                  </Input>

                </InputGroup>

                <InputGroup
                  display="flex" alignItems="center"
                  style={{ marginTop: 15 }}>

                  <FormLabel color="white">Name</FormLabel>
                  <Input
                    fontSize={{ base: "20px", md: "20px" }}
                    fontFamily="Work sans"
                    placeholder={user.name}
                    onChange={(e) => setName(e.target.value)}
                    backgroundColor="white"
                  >
                  </Input>

                </InputGroup>

                <InputGroup
                  display="flex" alignItems="center"
                  style={{ marginTop: 15 }}>

                  <FormLabel color="white">Password</FormLabel>
                  <Input
                    placeholder="Enter New Password"
                    fontSize={{ base: "20px", md: "20px" }}
                    fontFamily="Work sans"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    backgroundColor="white"
                  >
                  </Input>

                </InputGroup>

                <FormControl id='pic' marginTop="15px" >
                  <FormLabel color="white">Upload Your Avatar</FormLabel>
                  <Input
                    type="file"
                    p={1.5}
                    accepts="image/*"
                    onChange={(e) => postDetails(e.target.files[0])}
                    backgroundColor="white"
                  />
                </FormControl>

              </ModalBody>
              <ModalFooter
                display="flex">

                <Button margin="0 15px" color="white" backgroundColor="#609966" onClick={submitHandler} isLoading={loading}>Update</Button>
                <Button onClick={onClose}>Close</Button>

              </ModalFooter>
            </ModalContent>
          </Modal>
        </>) : (<>
          <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent h="410px" backgroundColor="#6096B4">
              <ModalHeader
                fontSize="25px"
                fontFamily="Work sans"
                display="flex"
                justifyContent="center"
                color="white"
              >
                <strong>{user.name}</strong>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="space-between"
              >
                <Image
                  borderRadius="full"
                  boxSize="150px"
                  src={user.pic}
                  alt={user.name}
                />

                <InputGroup>
                  <Text
                    fontSize={{ base: "20px", md: "20px" }}
                    fontFamily="Work sans"
                    color="white"
                  >
                    <strong>Email: {user.email}</strong>
                  </Text>

                </InputGroup>

              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose} backgroundColor="#BDCDD6">Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>))}

    </>
  );
};

export default ProfileModal;
