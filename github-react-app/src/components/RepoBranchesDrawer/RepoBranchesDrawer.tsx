import React, { useEffect, useState } from "react";

import { gitStore } from "@root/root";
import { RepoBranches, RepoItem } from "@store/GitHubStore/types";
import { Drawer } from "antd";
import { List } from "antd";

type RepoBranchesDrawerProps = {
    selectedRepo: RepoItem | null;
    onClose: () => void;
};

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({
    selectedRepo,
    onClose,
}) => {
    const [branches, setBranches] = useState<RepoBranches[] | null>(null);

    useEffect(() => {
        const func = async () => {
            if (selectedRepo !== null) {
                const result = await gitStore.getOrganizationRepoBranchesList({
                    organizationName: selectedRepo?.orgName,
                    repoName: selectedRepo.repoName,
                });
                setBranches(result.success ? result.data : []);
            }
        };

        func();
    }, []);

    return (
        <>
            {
                <Drawer
                    onClose={onClose}
                    title={selectedRepo?.repoName}
                    size="large"
                    visible={true}
                >
                    <h3>Branches:</h3>
                    <List
                        dataSource={branches?.map((element) => {
                            return <div key={element.name}>{element.name}</div>;
                        })}
                        renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                </Drawer>
            }
        </>
    );
};

export default RepoBranchesDrawer;
