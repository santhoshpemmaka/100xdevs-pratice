import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient()

async function insertUser(username: string, password: string,firstname:string, lastname:string) {
    const result = await prisma.user.create({
        data: {
            email: username,
            password,
            firstName: firstname,
            lastName: lastname
        },
        select: {
            id: true,
            email: true
        }
    });
    console.log("insert", result);
}
interface updateProps {
    firstName: string
    lastName:string
}

const updateUser = async (username: string, { firstName, lastName }: updateProps) => {
    const result = await prisma.user.update({
        where: {
            email : username
        },
        data: {
            firstName,
            lastName
        },
        select: {
            id: true,
            email:true
        }
    })
    console.log("update", result);
}

const deleteUser = async (username: string) => {
    const result = await prisma.user.delete({
        where: {
            email: username
        },
        select: {
            id:true
        }
    })
    console.log("delete", result);
};

const getUser = async () => {
    const result = await prisma.user.findMany();
    console.log("allusers", result);
};

const getUserByEmail = async (email:string) => {
    const result = await prisma.user.findFirst({
        where: {
            email
        },
        select: {
            todos: true,
            id: true,
            email:true
        }
    });
    console.log("get user email", result);
}

const createTodo = async (userId:number, title:string, description:string) => {
    const result = await prisma.todo.create({
        data: {
            title,
            userId,
            description
        },
        select: {
            userId: true
        }
    });
    console.log("create todo", result);
}

const getTodos = async (userId: number) => {
    const result = await prisma.todo.findMany({
        where: {
            userId: userId
        }
    });

    console.log("all todos", result);
};

const getTodosAndUserDetails = async (userId:number) => {
    // const user = await prisma.user.findFirst({
    //     where: {
    //         id: userId
    //     }
    // });

    // const resultTodo = await prisma.todo.findMany({
    //     where: {
    //         userId
    //     },
    // })
    // console.log("todos", resultTodo);
    // console.log("user",user)
    const todoDetails = await prisma.todo.findMany({
        where: {
            userId
        },
        select: {
            title: true,
            description: true,
            done: true,
            user: true
            
        }
    });
    console.log("todo Detials", todoDetails);
}


// insertUser("sa1@gmail.com","3edsaas","sdfas","asdfsad")
// updateUser("santhosh@gmail.com",{ firstName :"amaranth",lastName :"ada"})
// // deleteUser("sa@gmail.com");
// getUser();

// getUserByEmail("santhosh@gmail.com");

// createTodo(1, "go to gym1", "go to gym and do 10 pushups1");

// getTodos(5);

getTodosAndUserDetails(1);