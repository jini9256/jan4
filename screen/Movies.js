import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styled from "@emotion/native";
import { SCREEN_HEIGHT } from "../util";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";

export default function Movies({ navigation: { navigate } }) {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [isLoadong, setIsLoading] = useState(true);

  const title = "영화제목쓰";
  const rating = 7.5;
  const overview =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  const BASE_URL = "https://api.themoviedb.org/3/movie";
  const API_KEY = "5a7d52d33d0aa2e8956a73c736af7304";
  const getNowPlayings = async () => {
    const { results } = await fetch(
      `${BASE_URL}/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    ).then((res) => res.json());
    setNowPlaying(results);
    setIsLoading(false);
  };

  useEffect(() => {
    getNowPlayings();
  }, []);

  if (isLoadong) {
    return (
      <Loader>
        <ActivityIndicator />
      </Loader>
    );
  }

  return (
    <ScrollView>
      <Swiper height="100%" showsPagination={false} autoplay loop>
        {nowPlaying.map((movie) => (
          <Slide key={movie.id} movie={movie} />
        ))}
      </Swiper>
      <ListTitle>Top Rated Movies</ListTitle>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      >
        <VWrapper>
          <TRPoster source={require("../assets/sampleImg.png")} />
          <TRColumn>
            <Rating>⭐️{rating}/10</Rating>
            <TRTitle>
              {title.slice(0, 11)}
              {title.length > 11 && "..."}
            </TRTitle>
          </TRColumn>
        </VWrapper>
      </ScrollView>
      <ListTitle>Upcoming Movies</ListTitle>
      <UpcomingRow onPress={() => {}}>
        <UpcomingPoster source={require("../assets/sampleImg.png")} />
        <UpcomingColumn>
          <UpcomingTitle>{title}</UpcomingTitle>
          <Release>{"2022-12-02"}</Release>
          <UpcomingOverview>
            {overview.slice(0, 70)}
            {overview.length > 70 && "..."}
          </UpcomingOverview>
        </UpcomingColumn>
      </UpcomingRow>
      <UpcomingRow onPress={() => {}}>
        <UpcomingPoster source={require("../assets/sampleImg.png")} />
        <UpcomingColumn>
          <UpcomingTitle>{title}</UpcomingTitle>
          <Release>{"2022-12-02"}</Release>
          <UpcomingOverview>
            {overview.slice(0, 70)}
            {overview.length > 70 && "..."}
          </UpcomingOverview>
        </UpcomingColumn>
      </UpcomingRow>
      <UpcomingRow onPress={() => {}}>
        <UpcomingPoster source={require("../assets/sampleImg.png")} />
        <UpcomingColumn>
          <UpcomingTitle>{title}</UpcomingTitle>
          <Release>{"2022-12-02"}</Release>
          <UpcomingOverview>
            {overview.slice(0, 70)}
            {overview.length > 70 && "..."}
          </UpcomingOverview>
        </UpcomingColumn>
      </UpcomingRow>
      <UpcomingRow onPress={() => {}}>
        <UpcomingPoster source={require("../assets/sampleImg.png")} />
        <UpcomingColumn>
          <UpcomingTitle>{title}</UpcomingTitle>
          <Release>{"2022-12-02"}</Release>
          <UpcomingOverview>
            {overview.slice(0, 70)}
            {overview.length > 70 && "..."}
          </UpcomingOverview>
        </UpcomingColumn>
      </UpcomingRow>

      <View>
        {/* navigate이름은 옮겨가려하는 네비게이터가 다르므로 파일 이름(Stacks)을 써줘야한다 */}
        <TouchableOpacity
          onPress={() =>
            navigate("Stacks", { screen: "one", params: { id: 123 } })
          }
        >
          <Text>Detail</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.title};
`;

const TRPoster = styled.Image`
  width: 120px;
  height: 170px;
  background-color: grey;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;
const TRTitle = styled.Text`
  font-size: 13px;
  font-weight: 600;
  color: white;
`;
const VWrapper = styled.TouchableOpacity`
  background-color: black;
  border-radius: 5px;
  margin-right: 10px;
`;
const TRColumn = styled.View`
  padding: 10px;
`;
const UpcomingRow = styled.TouchableOpacity`
  flex-direction: row;
  margin-left: 20px;
  margin-bottom: 20px;
`;
const UpcomingPoster = styled.Image`
  width: 100px;
  height: 150px;
  background-color: grey;
  border-radius: 5px;
`;
const UpcomingTitle = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.upcomingText};
`;
const UpcomingOverview = styled.Text`
  font-size: 15px;
  line-height: 20px;
  font-weight: 500;
  color: ${(props) => props.theme.upcomingText};
`;
const UpcomingColumn = styled.View`
  margin-left: 20px;
  width: 60%;
`;
const Release = styled.Text`
  font-size: 16px;
  font-weight: 300;
  color: ${(props) => props.theme.upcomingText};
  margin-top: 10px;
  margin-bottom: 10px;
`;
const Rating = styled.Text`
  color: white;
  margin-top: 5px;
  margin-bottom: 5px;
`;
