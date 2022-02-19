import React, { useEffect, useState } from "react";

import GitHubStore from "@store/GitHubStore";
import { RepoBranches, RepoItem } from "@store/GitHubStore/types";
import { Drawer } from "antd";
import { List } from "antd";

type RepoBranchesDrawerProps = {
    selectedRepo: RepoItem | null;
    onClose?: () => void;
    visible: boolean;
};

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({
    selectedRepo,
    onClose,
    visible,
}) => {
    const [branches, setBranches] = useState<RepoBranches[] | null>(null);

    useEffect(() => {
        const func = async () => {
            const gitStore = new GitHubStore();
            if (selectedRepo !== null) {
                await gitStore
                    .getOrganizationRepoBranchesList({
                        organizationName: selectedRepo?.orgName,
                        repoName: selectedRepo.repoName,
                    })
                    .then((result) => setBranches(result.data));
            }
        };

        func();
    }, []);

    return (
        <>
            {
                <Drawer
                    visible={visible}
                    onClose={onClose}
                    title={selectedRepo?.repoName}
                    size="large"
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
