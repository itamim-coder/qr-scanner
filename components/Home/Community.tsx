import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from "react-native";

// Dummy data from assets
import data from "../../assets/data/leaderboard.json";

const Community = () => {
  const [visibleCount, setVisibleCount] = useState(5); // Initially display 5 items

  // Function to handle showing more items
  const handleShowMore = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 3, data.length)); // Add 3 more or stop at the end
  };

  // Render the Grouped Avatar for users with multiple images
  const renderGroupedAvatars = (avatars) => {
    // If there's more than one avatar, show a combined group of them
    return (
      <View className="flex-row">
        {avatars?.slice(0, 3).map((avatar, index) => (
          <Image
            key={index}
            source={{ uri: avatar }} // Assuming avatars are URL or local paths
            className={`w-12 h-12 rounded-full border-2 border-white -ml-2 ${
              index === 0 ? "" : ""
            }`} // Styling multiple avatars
          />
        ))}
        {avatars?.length > 3 && (
          <View className="bg-gray-300 rounded-full justify-center items-center w-8 h-8 ml-2">
            <Text className="text-xs font-semibold text-white">
              +{avatars.length - 3}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (

      <View className="p-3 flex-1 bg-white">
        {/* Header Section */}
        <Text className="text-xl text-center mb-3">#alteryouthrevoulution</Text>
        <Text className="text-2xl text-center font-semibold">
          The Scholarship Community
        </Text>

        {/* FlatList for Displaying Leaderboard Data */}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data.slice(0, visibleCount)} // Limit data to visibleCount items
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="shadow-md rounded-lg py-6 px-3 m-3 flex-row justify-between mb-3 bg-white">
              {/* Left side data: Name, Scholarship count, Date */}
              <View>
                <Text className="text-base text-gray-800 flex-1 font-bold">
                  @{item.name}
                </Text>
                <Text className="text-sm bg-green-50 p-1 px-2 rounded-lg my-3 text-green-500 font-semibold mr-2">
                  {item.count} scholarship
                </Text>
                <Text className="text-xs text-gray-400">
                  {new Date(item.started_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              </View>

              <View className="flex-row justify-end items-center">
                {renderGroupedAvatars(item.student_imgs)}
              </View>
            </View>
          )}
          ListFooterComponent={
            visibleCount < data.length && ( // Show button only if more items are available
              <TouchableOpacity
                onPress={handleShowMore}
                className=" py-2 px-4 rounded-lg"
              >
                <Text className="text-green-500 text-center text-lg font-bold">
                  See More
                </Text>
              </TouchableOpacity>
            )
          }
        />
      </View>
   
  );
};

export default Community;
