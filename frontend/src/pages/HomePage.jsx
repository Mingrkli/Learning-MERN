import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
    // Grabs the fetchProducts and products state
    const { fetchProducts, products } = useProductStore();

    // useEffect for this example from react means that whenever fetchProducts changes, we will rerun fetchProducts()
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    console.log("products", products);

    return (
        <Container maxW="container.xl" py={12}>
            <VStack spacing={8}>
                <Text
                    fontSize={"30"}
                    fontWeight={"bold"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={"text"}
                    textAlign={"center"}
                >
                    Current Products 🚀
                </Text>

                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 2,
                        lg: 3,
                    }}
                    spacing={10}
                    w={"full"}
                >
                    {/* For each product in products, we'll create a ProductCard where we will pass the product property to use in the ProductCard component */}
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </SimpleGrid>

                {/* If there is no products */}
                {products.length === 0 && (
                    <Text
                        fontSize="xl"
                        textAlign={"center"}
                        fontWeight="bold"
                        color="gray.500"
                    >
                        No products found 😢{" "}
                        <Link to={"/create"}>
                            <Text
                                as="span"
                                color="blue.500"
                                _hover={{ textDecoration: "underline" }}
                            >
                                Create a product
                            </Text>
                        </Link>
                    </Text>
                )}
            </VStack>
        </Container>
    );
};
export default HomePage;
