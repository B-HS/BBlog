import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";

const Menubar = (sign: Boolean, toggleMenu: Function) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    useEffect(() => {
        sign ? onOpen() : onClose();
    }, [sign]);
    return (
        <>
            <Drawer isOpen={isOpen} placement="left" onClose={() => toggleMenu()}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader> Hyunseok </DrawerHeader>
                    <DrawerBody padding={0}>
                        <div className="flex flex-col justify-between h-full">
                            <section className="menu p-8 h-3/6">
                                <h1 className="text-3xl">Menu</h1>
                                <ul>
                                    <li>asdf</li>
                                    <li>asdf</li>
                                    <li>asdf</li>
                                    <li>asdf</li>
                                </ul>
                            </section>
                            <hr />
                            <section className="recent p-8 h-3/6">
                                <h1 className="text-3xl">Recent Article</h1>
                                <ul>
                                    <li>asdf</li>
                                    <li>asdf</li>
                                    <li>asdf</li>
                                    <li>asdf</li>
                                </ul>
                            </section>
                            <hr />
                            <section className="visit p-8 h-1/6">
                                <h1 className="text-3xl">Visitor</h1>
                                <ul>
                                    <li>Today</li>
                                    <li>Total</li>
                                </ul>
                            </section>
                            <hr />
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Menubar;
